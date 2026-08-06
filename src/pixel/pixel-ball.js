/* <pixel-ball> — pixel-shaded rotating golf ball with a brand decal and a
   front-facing text decal ("section titles ride on the ball").
   Sizes itself to its host element. Spin follows window scroll + optional idle. */
(function(){
"use strict";
if (customElements.get("pixel-ball")) return;

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- brand logo mask (1 bit per pixel, read off the source art) ---- */
const MW_LO = 104, MH_LO = 24;
const MASK_LO_B64 = "AAAAAAAB+AAAAAAAAP+f8/wAB/wAAAAAAAD/n/P8CA/+AAAAAAAA/5/z/D8PzwAAAAAAAP+f8/5/j88AAAAAAAAfg/D+f4/PAAAAAAAAH4Pwfn8PzwAAAAAAAB+D8H4eD88AAAAAAAAfg/B+DA/ePAB+A8HwH4Pwfv8P3n4B/4fn+B+D8H7/D/x+A//f//wfg/B+fw/8fwf////8H4Pwfj8P+H+H5////B+D8H4/D/j/j+P/+fwfg/B+Pw/w/8/D8/D8H4Pwfj8P4O/vw/Pw/B+D8P4/D8HH78Pz8Pwfg/D8Px/Dx+/D8/D8H8f5/D8/x8fvw/Pw/B////g////v5+fz8PwP///4P////+f/4/D8B///8D/n/v/D/8Pw/wP/f+A/x/x/gf+D8P8B/B+AD4HwHwB+A/A/";

function unpack(b64, w, h){
  const out = new Uint8Array(w*h), bin = atob(b64);
  for(let i=0;i<w*h;i++) out[i] = (bin.charCodeAt(i>>3) >> (7-(i&7))) & 1;
  return out;
}
const maskLo = unpack(MASK_LO_B64, MW_LO, MH_LO);

/* ---- palettes: 7 shade steps each ---- */
const WHITE = [[104,104,104],[142,142,142],[176,176,176],[204,204,204],[226,226,226],[243,243,243],[255,255,255]];
const RED   = [[60,6,16],[96,8,24],[134,10,30],[168,11,36],[196,14,42],[218,40,62],[236,84,100]];
const INK   = [[8,10,9],[13,17,14],[18,24,20],[24,32,26],[30,40,33],[38,50,41],[46,60,50]];
const OUTLINE = [86,86,86];
const LEVELS = 7;

const LX=-0.42, LY=0.62, LZ=0.66;
const FX= 0.72, FY=-0.42, FZ=0.34;
const HX=-0.28, HY=0.41, HZ=0.87;

/* ---- dimples on a fibonacci sphere ---- */
const ND = 130;
const bX=new Float32Array(ND), bY=new Float32Array(ND), bZ=new Float32Array(ND);
(function(){
  const G = Math.PI*(3-Math.sqrt(5));
  for(let i=0;i<ND;i++){
    const yv=1-(i+0.5)/ND*2, r=Math.sqrt(Math.max(0,1-yv*yv)), th=G*i;
    bX[i]=Math.cos(th)*r; bY[i]=yv; bZ[i]=Math.sin(th)*r;
  }
})();
const COS_R=Math.cos(0.152), SIN_R=Math.sin(0.152);

const GRID = 18, MAXPER = 32, REACH = 0.165;

/* ---- brand decal frame, fixed to the surface ---- */
const TILT  = 48*Math.PI/180, DEC_W = 0.72, DEC_H = DEC_W*MH_LO/MW_LO;
let AX=0.90, AY=0.34, AZ=0.27;
(function(){ const n=Math.hypot(AX,AY,AZ); AX/=n; AY/=n; AZ/=n; })();
let cX,cY,cZ, hX,hY,hZ, wX,wY,wZ;
/* text decal sits on the same surface band as the logo, offset around the spin axis */
let tcX,tcY,tcZ, thX,thY,thZ, twX,twY,twZ;
const PHI = 2.30;
function spinAxis(vx,vy,vz,ang){
  const c=Math.cos(ang), s=Math.sin(ang), t=1-c;
  return [
    (t*AX*AX+c)*vx    + (t*AX*AY-s*AZ)*vy + (t*AX*AZ+s*AY)*vz,
    (t*AX*AY+s*AZ)*vx + (t*AY*AY+c)*vy    + (t*AY*AZ-s*AX)*vz,
    (t*AX*AZ-s*AY)*vx + (t*AY*AZ+s*AX)*vy + (t*AZ*AZ+c)*vz
  ];
}
(function(){
  let px=AY, py=-AX, pz=0;
  let n=Math.hypot(px,py,pz); px/=n; py/=n; pz/=n;
  const ca=Math.cos(TILT), sa=Math.sin(TILT);
  cX=AX*ca+px*sa; cY=AY*ca+py*sa; cZ=AZ*ca+pz*sa;
  let tx=AY*cZ-AZ*cY, ty=AZ*cX-AX*cZ, tz=AX*cY-AY*cX;
  n=Math.hypot(tx,ty,tz); tx/=n; ty/=n; tz/=n;
  hX=cY*tz-cZ*ty; hY=cZ*tx-cX*tz; hZ=cX*ty-cY*tx;
  wX=-tx; wY=-ty; wZ=-tz;
})();
(function(){
  const c=spinAxis(cX,cY,cZ,PHI), h=spinAxis(hX,hY,hZ,PHI), w=spinAxis(wX,wY,wZ,PHI);
  tcX=c[0]; tcY=c[1]; tcZ=c[2];
  thX=h[0]; thY=h[1]; thZ=h[2];
  twX=w[0]; twY=w[1]; twZ=w[2];
})();

/* ---- text decal: render a label small, threshold it, crop to ink ---- */
function makeTextMask(text){
  const CW=160, CH=22;
  const c=document.createElement("canvas"); c.width=CW; c.height=CH;
  const g=c.getContext("2d");
  const t=String(text||"").toUpperCase();
  g.textBaseline="middle"; g.textAlign="center";
  try{ g.letterSpacing="1px"; }catch(e){}
  let size=17;
  while(size>6){
    g.font="bold "+size+'px "Courier New", ui-monospace, monospace';
    if(g.measureText(t).width <= CW-8) break;
    size--;
  }
  g.fillStyle="#fff"; g.fillText(t, CW/2, CH/2);
  const d=g.getImageData(0,0,CW,CH).data;
  let x0=CW, x1=-1, y0=CH, y1=-1;
  for(let y=0;y<CH;y++) for(let x=0;x<CW;x++){
    if(d[(y*CW+x)*4+3] > 110){
      if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y;
    }
  }
  if(x1<0) return null;
  const w=x1-x0+1, h=y1-y0+1;
  const m=new Uint8Array(w*h);
  for(let y=0;y<h;y++) for(let x=0;x<w;x++)
    m[y*w+x] = d[((y+y0)*CW+(x+x0))*4+3] > 110 ? 1 : 0;
  const maxH=0.20, maxW=0.86;
  let dw=Math.min(maxW, maxH*w/h);
  return { m:m, w:w, h:h, dw:dw, dh:dw*h/w };
}

class PixelBall extends HTMLElement{
  constructor(){
    super();
    this.attachShadow({mode:"open"});
    this.shadowRoot.innerHTML =
      '<style>:host{display:block;position:relative;width:100%;height:100%;overflow:hidden;}canvas{position:absolute;left:50%;top:50%;' +
      'transform:translate(-50%,-50%);image-rendering:pixelated;}</style><canvas></canvas>';
    this.cv = this.shadowRoot.querySelector("canvas");
    this.ctx = this.cv.getContext("2d");
    this.angle = 0;
    this.drift = 0;
    this.textMask = null;
    this.RES = 0;
    this.cellCount = new Int32Array(GRID*GRID);
    this.cellItems = new Int32Array(GRID*GRID*MAXPER);
    this.vX=new Float32Array(ND); this.vY=new Float32Array(ND); this.vZ=new Float32Array(ND);
    this._frame = this._frame.bind(this);
  }

  static get observedAttributes(){ return ["label","idle","max-size","maxsize","start-angle","startangle"]; }
  attributeChangedCallback(n,o,v){
    if(n==="label") this.setLabel(v);
    if(n==="start-angle" || n==="startangle") this.startAngle = v;
    if(n==="max-size" || n==="maxsize") this.layout();
  }

  connectedCallback(){
    const sa = parseFloat(this.getAttribute("start-angle") || this.getAttribute("startangle"));
    if(!isNaN(sa)){ this._started=true; this.angle = sa; }
    this.lastScroll = window.scrollY;
    this.last = performance.now();
    this.layout();
    if(this.getAttribute("label")) this.setLabel(this.getAttribute("label"));
    this.ro = new ResizeObserver(()=>this.layout());
    this.ro.observe(this);
    this.raf = requestAnimationFrame(this._frame);
  }
  disconnectedCallback(){
    if(this.ro) this.ro.disconnect();
    cancelAnimationFrame(this.raf);
  }

  set startAngle(v){
    const sa=parseFloat(v);
    if(isNaN(sa) || this._started) return;
    this._started=true; this.angle=sa;
    if(this.P) this.draw(sa);
  }
  get startAngle(){ return this.angle; }

  setLabel(t){
    const next = String(t||"");
    if(next === this._label) return;
    this._label = next;
    this.textMask = next ? makeTextMask(next) : null;
  }
  setDrift(d){ this.drift = d; }

  layout(){
    const cap = parseFloat(this.getAttribute("max-size") || this.getAttribute("maxsize")) || 640;
    const cw = this.clientWidth, ch = this.clientHeight;
    if(!cw || !ch) return;   /* host not measured yet — wait for the ResizeObserver */
    const target = Math.max(60, Math.min(cap, cw, ch));
    const PIXEL_MAX = 190;
    const scale = Math.max(3, Math.ceil(target/PIXEL_MAX));
    const res = Math.max(40, Math.min(PIXEL_MAX, Math.floor(target/scale)));
    const size = res*scale;
    if(res !== this.RES) this.build(res);
    this.cv.style.width = size+"px";
    this.cv.style.height = size+"px";
    this.draw(this.angle);
  }

  build(res){
    this.RES=res;
    const RAD=res/2-2;
    this.RAD=RAD;
    this.cv.width=this.cv.height=res;
    this.img=this.ctx.createImageData(res,res);
    this.buf=this.img.data;
    const cx=res/2, cy=res/2;
    const edgeR=Math.pow((RAD-1.35)/RAD,2);
    const I=[],X=[],Y=[],Z=[],E=[],C=[];
    for(let y=0;y<res;y++) for(let x=0;x<res;x++){
      const sx=(x+0.5-cx)/RAD, sy=(cy-(y+0.5))/RAD;
      const d2=sx*sx+sy*sy;
      if(d2>1) continue;
      let gx=((sx+1)*0.5*GRID)|0, gy=((sy+1)*0.5*GRID)|0;
      if(gx<0)gx=0; else if(gx>=GRID)gx=GRID-1;
      if(gy<0)gy=0; else if(gy>=GRID)gy=GRID-1;
      I.push((y*res+x)*4); X.push(sx); Y.push(sy); Z.push(Math.sqrt(1-d2));
      E.push(d2>edgeR?1:0); C.push(gy*GRID+gx);
    }
    this.P=I.length;
    this.pI=new Int32Array(I); this.pX=new Float32Array(X); this.pY=new Float32Array(Y);
    this.pZ=new Float32Array(Z); this.pEdge=new Uint8Array(E); this.pCell=new Int32Array(C);
  }

  _frame(now){
    const dt=Math.min(64, now-this.last); this.last=now;
    const y=window.scrollY;
    this.angle += (y-this.lastScroll)*0.011;
    this.lastScroll=y;
    const idle=parseFloat(this.getAttribute("idle"));
    if(!reduced && idle) this.angle += idle*dt/1000;
    this.draw(this.angle);
    this.raf=requestAnimationFrame(this._frame);
  }

  draw(angle){
    if(!this.P) return;
    const buf=this.buf, cellCount=this.cellCount, cellItems=this.cellItems;
    const vX=this.vX, vY=this.vY, vZ=this.vZ;
    const c=Math.cos(angle), s=Math.sin(angle), t=1-c;
    const m0=t*AX*AX+c,    m1=t*AX*AY-s*AZ, m2=t*AX*AZ+s*AY;
    const m3=t*AX*AY+s*AZ, m4=t*AY*AY+c,    m5=t*AY*AZ-s*AX;
    const m6=t*AX*AZ-s*AY, m7=t*AY*AZ+s*AX, m8=t*AZ*AZ+c;

    cellCount.fill(0);
    let vis=0;
    for(let i=0;i<ND;i++){
      const x=bX[i], yy=bY[i], z=bZ[i];
      const rz=m6*x+m7*yy+m8*z;
      if(rz < -0.24) continue;
      const rx=m0*x+m1*yy+m2*z, ry=m3*x+m4*yy+m5*z;
      vX[vis]=rx; vY[vis]=ry; vZ[vis]=rz;
      let x0=(((rx-REACH)+1)*0.5*GRID)|0, x1=(((rx+REACH)+1)*0.5*GRID)|0;
      let y0=(((ry-REACH)+1)*0.5*GRID)|0, y1=(((ry+REACH)+1)*0.5*GRID)|0;
      if(x0<0)x0=0; if(y0<0)y0=0;
      if(x1>=GRID)x1=GRID-1; if(y1>=GRID)y1=GRID-1;
      for(let gy=y0;gy<=y1;gy++) for(let gx=x0;gx<=x1;gx++){
        const ci=gy*GRID+gx, n=cellCount[ci];
        if(n<MAXPER){ cellItems[ci*MAXPER+n]=vis; cellCount[ci]=n+1; }
      }
      vis++;
    }

    const Cx=m0*cX+m1*cY+m2*cZ, Cy=m3*cX+m4*cY+m5*cZ, Cz=m6*cX+m7*cY+m8*cZ;
    const Hx=m0*hX+m1*hY+m2*hZ, Hy=m3*hX+m4*hY+m5*hZ, Hz=m6*hX+m7*hY+m8*hZ;
    const Wx=m0*wX+m1*wY+m2*wZ, Wy=m3*wX+m4*wY+m5*wZ, Wz=m6*wX+m7*wY+m8*wZ;
    const decalNear = Cz > -0.55;

    /* text decal: engraved on the surface, so it rotates away with the ball */
    const tm=this.textMask;
    const TCx=m0*tcX+m1*tcY+m2*tcZ, TCy=m3*tcX+m4*tcY+m5*tcZ, TCz=m6*tcX+m7*tcY+m8*tcZ;
    const THx=m0*thX+m1*thY+m2*thZ, THy=m3*thX+m4*thY+m5*thZ, THz=m6*thX+m7*thY+m8*thZ;
    const TWx=m0*twX+m1*twY+m2*twZ, TWy=m3*twX+m4*twY+m5*twZ, TWz=m6*twX+m7*twY+m8*twZ;
    const textNear = tm && TCz > -0.55;

    for(let p=0;p<this.P;p++){
      const nx=this.pX[p], ny=this.pY[p], nz=this.pZ[p];
      const cell=this.pCell[p], nc=cellCount[cell], base=cell*MAXPER;
      let best=-2, bi=-1;
      for(let k=0;k<nc;k++){
        const j=cellItems[base+k];
        const dd=nx*vX[j]+ny*vY[j]+nz*vZ[j];
        if(dd>best){ best=dd; bi=j; }
      }
      let Nx=nx, Ny=ny, Nz=nz, ao=1;
      if(best > COS_R){
        let gx=vX[bi]-best*nx, gy=vY[bi]-best*ny, gz=vZ[bi]-best*nz;
        const gl=Math.sqrt(gx*gx+gy*gy+gz*gz);
        if(gl > 1e-5){
          const u=gl/SIN_R, k2=0.66*u/gl;
          Nx+=gx*k2; Ny+=gy*k2; Nz+=gz*k2;
          ao=0.84+0.16*u;
        } else ao=0.84;
        const inv=1/Math.sqrt(Nx*Nx+Ny*Ny+Nz*Nz);
        Nx*=inv; Ny*=inv; Nz*=inv;
      }
      let lam=Nx*LX+Ny*LY+Nz*LZ; if(lam<0) lam=0;
      let fil=Nx*FX+Ny*FY+Nz*FZ; if(fil<0) fil=0;
      let v=(0.27 + 0.78*lam + 0.15*fil)*ao;
      if(nz < 0.28) v *= 0.74 + 0.93*nz;
      const spc = Nx*HX+Ny*HY+Nz*HZ;

      let cov=0, tcov=0;
      if(decalNear && (nx*Cx+ny*Cy+nz*Cz) > 0.70){
        let a=nx*Hx+ny*Hy+nz*Hz; if(a>1)a=1; else if(a<-1)a=-1;
        const du=Math.asin(a)/DEC_W;
        if(du>-1 && du<1){
          let b=nx*Wx+ny*Wy+nz*Wz; if(b>1)b=1; else if(b<-1)b=-1;
          const dv=Math.asin(b)/DEC_H;
          if(dv>-1 && dv<1){
            const fx=(du*0.5+0.5)*MW_LO, fy=(0.5-dv*0.5)*MH_LO;
            cov=maskLo[((fy|0)*MW_LO)+(fx|0)];
          }
        }
      }
      if(textNear && (nx*TCx+ny*TCy+nz*TCz) > 0.66){
        let a=nx*THx+ny*THy+nz*THz; if(a>1)a=1; else if(a<-1)a=-1;
        const du=Math.asin(a)/tm.dw;
        if(du>-1 && du<1){
          let b=nx*TWx+ny*TWy+nz*TWz; if(b>1)b=1; else if(b<-1)b=-1;
          const dv=Math.asin(b)/tm.dh;
          if(dv>-1 && dv<1){
            const fx=(du*0.5+0.5)*tm.w, fy=(0.5-dv*0.5)*tm.h;
            tcov=tm.m[((fy|0)*tm.w)+(fx|0)];
          }
        }
      }

      let lv=(v*LEVELS)|0;
      if(lv<0)lv=0; else if(lv>=LEVELS)lv=LEVELS-1;
      if(spc>0.985 && best<=COS_R) lv=LEVELS-1;
      const ramp = tcov ? INK : (cov ? RED : WHITE);
      const sh = this.pEdge[p] ? OUTLINE : ramp[lv];
      const o=this.pI[p];
      buf[o]=sh[0]; buf[o+1]=sh[1]; buf[o+2]=sh[2]; buf[o+3]=255;
    }
    this.ctx.putImageData(this.img,0,0);
  }
}
customElements.define("pixel-ball", PixelBall);
})();
