function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}function t(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;let r=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new r(i,e,o)},c=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new r("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:l,defineProperty:d,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:g}=Object,f=globalThis,_=f.trustedTypes,m=_?_.emptyScript:"",y=f.reactiveElementPolyfillSupport,b=(e,t)=>e,$={toAttribute(e,t){switch(t){case Boolean:e=e?m:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},w=(e,t)=>!l(e,t),v={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:w};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=v){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&d(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??v}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const e=this.properties,t=[...u(e),...p(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(s)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of t){const t=document.createElement("style"),o=i.litNonce;void 0!==o&&t.setAttribute("nonce",o),t.textContent=s.cssText,e.appendChild(t)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:$;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??w)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[b("elementProperties")]=new Map,x[b("finalized")]=new Map,y?.({ReactiveElement:x}),(f.reactiveElementVersions??=[]).push("2.1.2");const A=globalThis,C=e=>e,S=A.trustedTypes,E=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,T="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,N="?"+k,z=`<${N}>`,P=document,O=()=>P.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,D=Array.isArray,M="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,R=/>/g,L=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,W=/"/g,V=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),q=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),F=new WeakMap,K=P.createTreeWalker(P,129);function J(e,t){if(!D(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const Y=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=U;for(let t=0;t<i;t++){const i=e[t];let a,c,l=-1,d=0;for(;d<i.length&&(r.lastIndex=d,c=r.exec(i),null!==c);)d=r.lastIndex,r===U?"!--"===c[1]?r=H:void 0!==c[1]?r=R:void 0!==c[2]?(V.test(c[2])&&(o=RegExp("</"+c[2],"g")),r=L):void 0!==c[3]&&(r=L):r===L?">"===c[0]?(r=o??U,l=-1):void 0===c[1]?l=-2:(l=r.lastIndex-c[2].length,a=c[1],r=void 0===c[3]?L:'"'===c[3]?W:j):r===W||r===j?r=L:r===H||r===R?r=U:(r=L,o=void 0);const h=r===L&&e[t+1].startsWith("/>")?" ":"";n+=r===U?i+z:l>=0?(s.push(a),i.slice(0,l)+T+i.slice(l)+k+h):i+k+(-2===l?t:h)}return[J(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,a=this.parts,[c,l]=Y(e,t);if(this.el=Z.createElement(c,i),K.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=K.nextNode())&&a.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(T)){const t=l[n++],i=s.getAttribute(e).split(k),r=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ie:"?"===r[1]?se:"@"===r[1]?oe:te}),s.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:o}),s.removeAttribute(e));if(V.test(s.tagName)){const e=s.textContent.split(k),t=e.length-1;if(t>0){s.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],O()),K.nextNode(),a.push({type:2,index:++o});s.append(e[t],O())}}}else if(8===s.nodeType)if(s.data===N)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(k,e+1));)a.push({type:7,index:o}),e+=k.length-1}o++}}static createElement(e,t){const i=P.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,s){if(t===q)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=I(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=X(e,o._$AS(e,t.values),o,s)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??P).importNode(t,!0);K.currentNode=s;let o=K.nextNode(),n=0,r=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new ee(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new ne(o,this,e)),this._$AV.push(t),a=i[++r]}n!==a?.index&&(o=K.nextNode(),n++)}return K.currentNode=P,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ee{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),I(e)?e===G||null==e||""===e?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==q&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>D(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==G&&I(this._$AH)?this._$AA.nextSibling.data=e:this.T(P.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(J(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new Q(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=F.get(e.strings);return void 0===t&&F.set(e.strings,t=new Z(e)),t}k(e){D(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new ee(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class te{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=X(this,e,t,0),n=!I(e)||e!==this._$AH&&e!==q,n&&(this._$AH=e);else{const s=e;let r,a;for(e=o[0],r=0;r<o.length-1;r++)a=X(this,s[i+r],t,r),a===q&&(a=this._$AH[r]),n||=!I(a)||a!==this._$AH[r],a===G?e=G:e!==G&&(e+=(a??"")+o[r+1]),this._$AH[r]=a}n&&!s&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ie extends te{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}}class se extends te{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==G)}}class oe extends te{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??G)===q)return;const i=this._$AH,s=e===G&&i!==G||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==G&&(i===G||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class ne{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const re=A.litHtmlPolyfillSupport;re?.(Z,ee),(A.litHtmlVersions??=[]).push("3.3.3");const ae=globalThis;class ce extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new ee(t.insertBefore(O(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return q}}ce._$litElement$=!0,ce.finalized=!0,ae.litElementHydrateSupport?.({LitElement:ce});const le=ae.litElementPolyfillSupport;le?.({LitElement:ce}),(ae.litElementVersions??=[]).push("4.2.2");const de=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:w},ue=(e=he,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function pe(e){return(t,i)=>"object"==typeof i?ue(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return pe({...e,state:!0,attribute:!1})}const fe=a`
  :host {
    --wcs-accent-color: var(--primary-color, #03a9f4);
    --wcs-text-primary: var(--primary-text-color, #e1e1e1);
    --wcs-text-secondary: var(--secondary-text-color, #9e9e9e);
    --wcs-card-bg: var(--ha-card-background, var(--card-background-color, #1c1c1e));
    --wcs-card-border-radius: var(--ha-card-border-radius, 16px);
    --wcs-card-border-width: var(--ha-card-border-width, 1px);
    --wcs-card-border-color: var(--ha-card-border-color, rgba(255, 255, 255, 0.1));
    display: block;
  }

  .wcs-card {
    background: var(--wcs-card-bg);
    border-radius: var(--wcs-card-border-radius);
    border: var(--wcs-card-border-width) solid var(--wcs-card-border-color);
    padding: 16px;
    box-shadow: var(--ha-card-box-shadow, none);
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    position: relative;
    overflow: hidden;
  }

  .wcs-card.layout-grid {
    padding: 12px;
  }

  .wcs-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--wcs-text-primary);
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  .wcs-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .wcs-container.layout-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 10px;
  }

  /* Waste Item Styling */
  .wcs-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    cursor: pointer;
  }

  .wcs-item:hover {
    background: rgba(255, 255, 255, 0.06);
    transform: translateY(-2px);
  }

  /* Grid specific item styles */
  .wcs-item.layout-grid {
    flex-direction: column;
    justify-content: center;
    text-align: center;
    padding: 16px 8px;
    min-height: 120px;
    gap: 8px;
  }

  .wcs-item.layout-row {
    padding: 8px 12px;
    border-radius: 8px;
    border: none;
    background: transparent;
  }

  .wcs-item.layout-row:hover {
    background: rgba(255, 255, 255, 0.03);
    transform: none;
  }

  /* Icon wrapper */
  .wcs-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .wcs-icon-wrapper.layout-grid {
    margin-bottom: 4px;
  }

  /* Content wrapper */
  .wcs-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 16px;
  }

  .wcs-content.layout-grid {
    margin-left: 0;
    align-items: center;
    width: 100%;
  }

  .wcs-content.layout-row {
    margin-left: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  /* Typographies */
  .wcs-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--wcs-text-primary);
    line-height: 1.2;
  }

  .wcs-name.layout-grid {
    font-size: 0.9rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  .wcs-details {
    font-size: 0.85rem;
    color: var(--wcs-text-secondary);
    margin-top: 4px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .wcs-details.layout-grid {
    justify-content: center;
    text-align: center;
    margin-top: 2px;
  }

  .wcs-details.layout-row {
    margin-top: 0;
  }

  /* Days badge */
  .wcs-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* State Alerts */
  .wcs-item.due-today {
    background: rgba(var(--rgb-due-color, 244, 67, 54), 0.08);
    border-color: rgba(var(--rgb-due-color, 244, 67, 54), 0.3);
    animation: wcs-pulse-today 2s infinite ease-in-out;
  }
  
  .wcs-item.due-tomorrow {
    background: rgba(var(--rgb-due-1-color, 255, 152, 0), 0.06);
    border-color: rgba(var(--rgb-due-1-color, 255, 152, 0), 0.25);
  }

  .wcs-badge.today {
    background: rgb(var(--rgb-due-color, 244, 67, 54));
    color: #ffffff;
  }

  .wcs-badge.tomorrow {
    background: rgb(var(--rgb-due-1-color, 255, 152, 0));
    color: #ffffff;
  }

  .wcs-badge.upcoming {
    background: rgba(255, 255, 255, 0.08);
    color: var(--wcs-text-secondary);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Animations */
  @keyframes wcs-pulse-today {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--rgb-due-color, 244, 67, 54), 0.3);
    }
    70% {
      box-shadow: 0 0 0 6px rgba(var(--rgb-due-color, 244, 67, 54), 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(var(--rgb-due-color, 244, 67, 54), 0);
    }
  }

  /* Responsive tweaks */
  @media (max-width: 350px) {
    .wcs-container.layout-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
`,_e={en:{"state.today":"Today","state.tomorrow":"Tomorrow","state.in_days":"In {days} days","state.1_day":"In 1 day","state.days":"days","state.day":"day","editor.entity":"Entity (Required)","editor.entities":"Entities (Optional, list)","editor.title":"Title","editor.layout":"Layout Style","editor.layout_card":"Standard Card","editor.layout_row":"Compact Row","editor.layout_grid":"Grid Layout","editor.hide_before":"Hide entire card until X days before (Default: -1 / disabled)","editor.hide_date":"Hide Date Text","editor.hide_days":"Hide Number of Days","editor.hide_dow":"Hide Day of the Week","editor.hide_icon":"Hide Icon","editor.hide_on_click":"Dismiss on click (when due today/tomorrow)","editor.hide_on_today":"Hide on today (e.g. if collected early in morning)","editor.hide_title":"Hide Title","editor.icon_size":"Icon Size (e.g., 30px)","editor.due_color":"Due Today Color (e.g., red or #ff0000)","editor.due_1_color":"Due Tomorrow Color (e.g., orange)","editor.icon_color":"Standard Icon Color (e.g., var(--primary-text-color))","editor.invalid_json":"Invalid JSON format","editor.max_items":"Maximum items to display (Default: 5)","editor.next_only":"Only show the next upcoming collection per waste type"},de:{"state.today":"Heute","state.tomorrow":"Morgen","state.in_days":"In {days} Tagen","state.1_day":"In 1 Tag","state.days":"Tage","state.day":"Tag","editor.entity":"Entität (Erforderlich)","editor.entities":"Entitäten (Optional, Liste)","editor.title":"Titel","editor.layout":"Layout-Stil","editor.layout_card":"Standard-Karte","editor.layout_row":"Kompakte Zeile","editor.layout_grid":"Raster-Layout (Grid)","editor.hide_before":"Karte ausblenden bis X Tage vor Termin (Standard: -1 / inaktiv)","editor.hide_date":"Datum ausblenden","editor.hide_days":"Tage ausblenden","editor.hide_dow":"Wochentag ausblenden","editor.hide_icon":"Icon ausblenden","editor.hide_on_click":"Per Klick ausblenden (wenn heute/morgen fällig)","editor.hide_on_today":"Heute ausblenden (z.B. bei früher Abholung)","editor.hide_title":"Titel ausblenden","editor.icon_size":"Icon-Größe (z.B. 30px)","editor.due_color":"Farbe am Abholtag (z.B. red oder #ff0000)","editor.due_1_color":"Farbe am Vortag (z.B. orange)","editor.icon_color":"Standard Icon-Farbe (z.B. var(--primary-text-color))","editor.invalid_json":"Ungültiges JSON-Format","editor.max_items":"Maximale Anzahl an Terminen (Standard: 5)","editor.next_only":"Nur den nächsten Termin pro Müllsorte anzeigen"}};function me(e,t="",i="",s="en"){const o=s.split("-")[0];let n=(_e[o]||_e.en)[e]||_e.en[e]||e;return""!==t&&""!==i&&(n=n.replace(t,i)),n}function ye(e){return e.replace(/Waste Collection Schedule\s*/gi,"").trim()}function be(e){if(!e)return null;let t=e.match(/(\d{4})-(\d{2})-(\d{2})/);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])):(t=e.match(/(\d{2})\.(\d{2})\.(\d{4})/),t?new Date(Number(t[3]),Number(t[2])-1,Number(t[1])):null)}const $e=[{value:"mdi:leaf",label:"Leaf (Bio / Garden)"},{value:"mdi:trash-can",label:"Trash Can (Restmüll)"},{value:"mdi:package-variant",label:"Package (Papier)"},{value:"mdi:recycle",label:"Recycle (Gelber Sack)"},{value:"mdi:glass-fragile",label:"Glass (Glas)"},{value:"mdi:sofa",label:"Sofa (Sperrmüll)"},{value:"mdi:biohazard",label:"Biohazard (Schadstoff)"},{value:"mdi:pine-tree",label:"Pine Tree (Weihnachtsbaum)"},{value:"mdi:trash-can-outline",label:"Default outline"}];let we=class extends ce{setConfig(e){this._config=e}get _title(){return this._config?.title||""}get _layout(){return this._config?.layout||"card"}get _hide_before(){return this._config?.hide_before??-1}get _due_color(){return this._config?.due_color||"#f44336"}get _due_1_color(){return this._config?.due_1_color||"#ff9800"}get _icon_size(){return this._config?.icon_size||"30px"}get _max_items(){return this._config?.max_items??5}get _next_only(){return!1!==this._config?.next_only}get _entitiesList(){const e=[];this._config?.entity&&e.push(this._config.entity),this._config?.entities&&Array.isArray(this._config.entities)&&e.push(...this._config.entities);const t=[];for(const i of e)""===i?t.push(i):t.includes(i)||t.push(i);return t}_getDetectedWasteTypes(){if(!this.hass||!this._config)return[];const e=new Set,t=this._entitiesList;for(const i of t){const t=this.hass.states[i];if(!t)continue;const s=t.attributes;if(s.wastes&&Array.isArray(s.wastes))for(const t of s.wastes)t.type&&e.add(ye(t.type));for(const[t,i]of Object.entries(s))be(t)&&e.add(ye(String(i)));const o=ye(s.friendly_name||i.split(".").pop()||"");o&&e.add(o)}return Array.from(e).filter(Boolean)}_getWasteColor(e){const t=this._config?.custom_colors||{};if(t[e])return t[e];const i=e.toLowerCase();return i.includes("bio")||i.includes("organ")||i.includes("braun")||i.includes("garten")?"#4caf50":i.includes("papier")||i.includes("pappe")||i.includes("blau")?"#2196f3":i.includes("gelb")||i.includes("plastik")||i.includes("recycle")||i.includes("wertstoff")?"#fbc02d":i.includes("rest")||i.includes("hausmüll")||i.includes("grau")||i.includes("schwarz")?"#707070":i.includes("glas")||i.includes("flasche")?"#00bcd4":"#e1e1e1"}_getWasteIcon(e){const t=this._config?.custom_icons||{};if(t[e])return t[e];const i=e.toLowerCase();return i.includes("bio")||i.includes("organ")||i.includes("braun")||i.includes("garten")?"mdi:leaf":i.includes("papier")||i.includes("pappe")||i.includes("blau")?"mdi:package-variant":i.includes("gelb")||i.includes("plastik")||i.includes("recycle")||i.includes("wertstoff")?"mdi:recycle":i.includes("rest")||i.includes("hausmüll")||i.includes("grau")||i.includes("schwarz")?"mdi:trash-can":i.includes("glas")||i.includes("flasche")?"mdi:glass-fragile":"mdi:trash-can-outline"}render(){if(!this.hass)return B``;const e=this.hass.language||"en",t=this._getDetectedWasteTypes(),i=this._entitiesList;return B`
      <div class="card-config">
        <!-- Multiple Entities Picker List -->
        <div class="option">
          <div class="section-title">Müllsensoren (Entitäten)</div>
          <div class="entities-list">
            ${i.map((e,t)=>B`
              <div class="entity-row">
                <ha-entity-picker
                  .hass="${this.hass}"
                  .value="${e}"
                  @value-changed="${e=>this._entityChanged(t,e)}"
                  allow-custom-entity
                ></ha-entity-picker>
                <button class="delete-btn" @click="${()=>this._removeEntity(t)}">
                  <ha-icon icon="mdi:delete"></ha-icon>
                </button>
              </div>
            `)}
          </div>
          <button class="add-btn" @click="${this._addEntity}">
            <ha-icon icon="mdi:plus"></ha-icon> Sensor hinzufügen
          </button>
        </div>

        <!-- Card Title -->
        <div class="option">
          <ha-textfield
            label="${me("editor.title","","",e)}"
            .value="${this._title}"
            .configValue="${"title"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Layout Style -->
        <div class="section-title">${me("editor.layout","","",e)}</div>
        <div class="option">
          <ha-select
            .value="${this._layout}"
            .configValue="${"layout"}"
            .options="${[{label:me("editor.layout_card","","",e),value:"card"},{label:me("editor.layout_row","","",e),value:"row"},{label:me("editor.layout_grid","","",e),value:"grid"}]}"
            @selected="${this._valueChanged}"
            @change="${this._valueChanged}"
            @value-changed="${this._valueChanged}"
            @closed="${e=>e.stopPropagation()}"
          >
          </ha-select>
        </div>

        <!-- Limit / Max Items -->
        <div class="option">
          <ha-textfield
            label="${me("editor.max_items","","",e)}"
            type="number"
            .value="${String(this._max_items)}"
            .configValue="${"max_items"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Threshold to Hide -->
        <div class="option">
          <ha-textfield
            label="${me("editor.hide_before","","",e)}"
            type="number"
            .value="${String(this._hide_before)}"
            .configValue="${"hide_before"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Style customization headers -->
        <div class="section-title">Farben für Termine & Icons</div>

        <!-- Due colors -->
        <div class="color-row">
          <div class="color-picker-wrapper">
            <span class="color-label">Heute fällig:</span>
            <input 
              type="color" 
              .value="${this._due_color}" 
              .configValue="${"due_color"}"
              @input="${this._valueChanged}"
            />
          </div>
          <div class="color-picker-wrapper">
            <span class="color-label">Morgen fällig:</span>
            <input 
              type="color" 
              .value="${this._due_1_color}" 
              .configValue="${"due_1_color"}"
              @input="${this._valueChanged}"
            />
          </div>
        </div>

        <div class="option">
          <ha-textfield
            label="${me("editor.icon_size","","",e)}"
            .value="${this._icon_size}"
            .configValue="${"icon_size"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>

        <!-- Detected Waste Types Custom Style Editor -->
        ${t.length>0?B`
              <div class="section-title">Müllsorten anpassen</div>
              <div class="waste-customizer-list">
                ${t.map(e=>this._renderWasteCustomizerRow(e))}
              </div>
            `:""}

        <!-- General switches -->
        <div class="section-title">Anzeige-Optionen</div>
        <div class="toggles">
          <ha-formfield .label="${me("editor.hide_title","","",e)}">
            <ha-switch
              .checked="${!this._config?.hide_title}"
              .configValue="${"hide_title"}"
              .invert="${!0}"
              @change="${this._toggleInvertedChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${me("editor.hide_date","","",e)}">
            <ha-switch
              .checked="${!!this._config?.hide_date}"
              .configValue="${"hide_date"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${me("editor.hide_days","","",e)}">
            <ha-switch
              .checked="${!!this._config?.hide_days}"
              .configValue="${"hide_days"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${me("editor.hide_icon","","",e)}">
            <ha-switch
              .checked="${!!this._config?.hide_icon}"
              .configValue="${"hide_icon"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${me("editor.hide_on_click","","",e)}">
            <ha-switch
              .checked="${!1!==this._config?.hide_on_click}"
              .configValue="${"hide_on_click"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${me("editor.hide_on_today","","",e)}">
            <ha-switch
              .checked="${!!this._config?.hide_on_today}"
              .configValue="${"hide_on_today"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>

          <ha-formfield .label="${me("editor.next_only","","",e)}">
            <ha-switch
              .checked="${this._next_only}"
              .configValue="${"next_only"}"
              @change="${this._toggleChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `}_renderWasteCustomizerRow(e){const t=this._getWasteIcon(e),i=this._getWasteColor(e),s=!$e.some(e=>e.value===t);return B`
      <div class="waste-row">
        <div class="waste-type-header">${e}</div>
        <div class="waste-inputs">
          <div class="color-picker-box">
            <input 
              type="color" 
              .value="${i}" 
              @input="${t=>this._customStyleChanged(e,"color",t.target.value)}"
            />
          </div>

          <div class="icon-selector">
            <select 
              .value="${s?"custom":t}"
              @change="${t=>this._customStyleChanged(e,"icon-select",t.target.value)}"
            >
              ${$e.map(e=>B`<option value="${e.value}">${e.label}</option>`)}
              <option value="custom">Custom Icon...</option>
            </select>
          </div>

          <div class="custom-icon-input">
            <input 
              type="text" 
              placeholder="mdi:trash-can" 
              .value="${t}"
              @input="${t=>this._customStyleChanged(e,"icon-text",t.target.value)}"
            />
          </div>
        </div>
      </div>
    `}_customStyleChanged(e,t,i){if(this._config){if("color"===t){const t={...this._config.custom_colors||{}};t[e]=i,this._config={...this._config,custom_colors:t}}else if("icon-select"===t){if("custom"!==i){const t={...this._config.custom_icons||{}};t[e]=i,this._config={...this._config,custom_icons:t}}}else if("icon-text"===t){const t={...this._config.custom_icons||{}};t[e]=i,this._config={...this._config,custom_icons:t}}this._fireConfigChanged()}}_entityChanged(e,t){if(!this._config)return;const i=t.detail.value,s=[...this._entitiesList];i?s[e]=i:s.splice(e,1),this._updateEntities(s)}_addEntity(){const e=[...this._entitiesList,""];this._updateEntities(e)}_removeEntity(e){const t=[...this._entitiesList];t.splice(e,1),this._updateEntities(t)}_updateEntities(e){this._config={...this._config,entity:void 0,entities:e.length>0?e:void 0},this._fireConfigChanged()}_valueChanged(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target,i=t.configValue||t.getAttribute("configValue");if(i){let s=void 0!==e.detail?.value?e.detail.value:t.value;"max_items"!==i&&"hide_before"!==i||(s=Number(s),isNaN(s)&&(s=void 0)),this._config={...this._config,[i]:s},this._fireConfigChanged()}}_toggleChanged(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target,i=t.configValue||t.getAttribute("configValue");i&&(this._config={...this._config,[i]:t.checked},this._fireConfigChanged())}_toggleInvertedChanged(e){if(!this._config||!this.hass)return;const t=e.currentTarget||e.target,i=t.configValue||t.getAttribute("configValue");i&&(this._config={...this._config,[i]:!t.checked},this._fireConfigChanged())}_fireConfigChanged(){const e=new CustomEvent("config-changed",{detail:{config:this._config},bubbles:!0,composed:!0});this.dispatchEvent(e)}static{this.styles=a`
    .card-config {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .option {
      display: flex;
      flex-direction: column;
    }
    .section-title {
      font-weight: bold;
      font-size: 1.1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 4px;
      margin-top: 8px;
    }
    .entities-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }
    .entity-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .entity-row ha-entity-picker {
      flex: 1;
    }
    .delete-btn, .add-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--primary-text-color, #fff);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      transition: background 0.2s;
    }
    .delete-btn:hover {
      background: rgba(244, 67, 54, 0.2);
      border-color: rgba(244, 67, 54, 0.4);
    }
    .add-btn {
      padding: 8px 16px;
      width: fit-content;
      gap: 6px;
    }
    .add-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    .color-row {
      display: flex;
      gap: 16px;
    }
    .color-picker-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    .color-picker-wrapper input[type="color"] {
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      background: none;
    }
    .color-label {
      font-size: 0.95rem;
    }
    .waste-customizer-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .waste-row {
      display: flex;
      flex-direction: column;
      background: rgba(255, 255, 255, 0.03);
      padding: 10px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    .waste-type-header {
      font-weight: 600;
      margin-bottom: 8px;
    }
    .waste-inputs {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .color-picker-box input[type="color"] {
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      background: none;
    }
    .icon-selector select {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 6px;
      min-width: 140px;
    }
    .custom-icon-input input {
      background: var(--card-background-color, #1e1e1e);
      color: var(--primary-text-color, #fff);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 4px;
      padding: 6px;
      width: 130px;
    }
    ha-select, ha-textfield, ha-textarea, ha-entity-picker {
      width: 100%;
    }
    .toggles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    ha-formfield {
      display: flex;
      align-items: center;
    }
  `}};function ve(e){let t=e.trim();if(t.startsWith("var("))return"244, 67, 54";t=t.replace("#",""),3===t.length&&(t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]);const i=parseInt(t,16);return isNaN(i)?"244, 67, 54":`${i>>16&255}, ${i>>8&255}, ${255&i}`}function xe(e){if(!e)return null;let t=e.match(/(\d{4})-(\d{2})-(\d{2})/);return t?new Date(Number(t[1]),Number(t[2])-1,Number(t[3])):(t=e.match(/(\d{2})\.(\d{2})\.(\d{4})/),t?new Date(Number(t[3]),Number(t[2])-1,Number(t[1])):(t=e.match(/(\d{2})\/(\d{2})\/(\d{4})/),t?new Date(Number(t[3]),Number(t[1])-1,Number(t[2])):null))}function Ae(e,t){const i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),s=new Date(t.getFullYear(),t.getMonth(),t.getDate()),o=i.getTime()-s.getTime();return Math.ceil(o/864e5)}function Ce(e){return e.replace(/Waste Collection Schedule\s*/gi,"").trim()}e([pe({attribute:!1}),t("design:type",Object)],we.prototype,"hass",void 0),e([ge(),t("design:type",Object)],we.prototype,"_config",void 0),we=e([de("waste-collection-schedule-card-editor")],we);let Se=class extends ce{static get styles(){return fe}static getConfigElement(){return document.createElement("waste-collection-schedule-card-editor")}static getStubConfig(){return{entity:"",title:"Müllabfuhr",layout:"card",hide_before:-1}}setConfig(e){if(!e)throw new Error("Invalid configuration");this.config={layout:"card",hide_before:-1,hide_date:!1,hide_days:!1,hide_dow:!0,hide_icon:!1,hide_on_click:!0,hide_on_today:!1,hide_title:!1,due_color:"#f44336",due_1_color:"#ff9800",icon_color:"var(--primary-text-color)",next_only:!0,max_items:5,...e}}shouldUpdate(e){if(e.has("config"))return!0;const t=e.get("hass");if(t){const e=this._getEntities();for(const i of e)if(t.states[i]!==this.hass.states[i])return!0;return!1}return!0}_getEntities(){const e=[];return this.config.entity&&e.push(this.config.entity),this.config.entities&&Array.isArray(this.config.entities)&&e.push(...this.config.entities),[...new Set(e)]}_getWasteIcon(e){if(this.config.custom_icons){const t=e.toLowerCase();for(const[e,i]of Object.entries(this.config.custom_icons))if(t.includes(e.toLowerCase()))return i}const t=e.toLowerCase();return t.includes("bio")||t.includes("organ")||t.includes("braun")||t.includes("garten")?"mdi:leaf":t.includes("papier")||t.includes("pappe")||t.includes("blau")?"mdi:package-variant":t.includes("gelb")||t.includes("plastik")||t.includes("recycle")||t.includes("wertstoff")?"mdi:recycle":t.includes("rest")||t.includes("hausmüll")||t.includes("grau")||t.includes("schwarz")?"mdi:trash-can":t.includes("glas")||t.includes("flasche")?"mdi:glass-fragile":t.includes("schadstoff")||t.includes("gift")||t.includes("chem")?"mdi:biohazard":t.includes("sperr")?"mdi:sofa":t.includes("tanne")||t.includes("baum")||t.includes("weihnacht")?"mdi:pine-tree":"mdi:trash-can-outline"}_getWasteColor(e){if(this.config.custom_colors){const t=e.toLowerCase();for(const[e,i]of Object.entries(this.config.custom_colors))if(t.includes(e.toLowerCase()))return i}const t=e.toLowerCase();return t.includes("bio")||t.includes("organ")||t.includes("braun")||t.includes("garten")?"#4caf50":t.includes("papier")||t.includes("pappe")||t.includes("blau")?"#2196f3":t.includes("gelb")||t.includes("plastik")||t.includes("recycle")||t.includes("wertstoff")?"#fbc02d":t.includes("rest")||t.includes("hausmüll")||t.includes("grau")||t.includes("schwarz")?"#707070":t.includes("glas")||t.includes("flasche")?"#00bcd4":t.includes("schadstoff")||t.includes("gift")||t.includes("chem")?"#9c27b0":t.includes("sperr")?"#795548":t.includes("tanne")||t.includes("baum")||t.includes("weihnacht")?"#009688":this.config.icon_color||"var(--primary-text-color)"}_parseEntities(){const e=[],t=this._getEntities(),i=new Date;for(const s of t){const t=this.hass.states[s];if(!t)continue;const o=t.attributes,n=Ce(o.friendly_name||s.split(".").pop()||"Müll");let r=!1;if(o.wastes&&Array.isArray(o.wastes))for(const t of o.wastes){const i=Number(t.daysTo);if(isNaN(i))continue;const o=t.date,a=Ce(t.type||n),c=0===i,l=1===i,d=`wcs_ack_${s}_${a}_${o}`,h="true"===localStorage.getItem(d);e.push({entityId:s,friendlyName:a,daysTo:i,dateText:o,types:[a],icon:this._getWasteIcon(a),color:this._getWasteColor(a),isToday:c,isTomorrow:l,isAcknowledged:h}),r=!0}for(const[t,n]of Object.entries(o)){const o=xe(t);if(o){const a=Ae(o,i);if(a<0)continue;const c=Ce(String(n)),l=t,d=0===a,h=1===a,u=`wcs_ack_${s}_${c}_${l}`,p="true"===localStorage.getItem(u);e.some(e=>e.entityId===s&&e.friendlyName===c&&e.dateText===l)||(e.push({entityId:s,friendlyName:c,daysTo:a,dateText:l,types:[c],icon:this._getWasteIcon(c),color:this._getWasteColor(c),isToday:d,isTomorrow:h,isAcknowledged:p}),r=!0)}}if(!r){let r=Number(t.state),a=o.dateText||"",c=n;if(isNaN(r)){const e=xe(t.state);e&&(r=Ae(e,i),a=t.state.replace(/^on\s+\w+,\s+/i,""))}if(!isNaN(r)&&r>=0){const t=0===r,i=1===r,o=`wcs_ack_${s}_${c}_${a}`,n="true"===localStorage.getItem(o);e.push({entityId:s,friendlyName:c,daysTo:r,dateText:a,types:[c],icon:this._getWasteIcon(c),color:this._getWasteColor(c),isToday:t,isTomorrow:i,isAcknowledged:n})}}}let s=e.sort((e,t)=>e.daysTo-t.daysTo);if(!1!==this.config.next_only){const e=new Set;s=s.filter(t=>{const i=t.friendlyName.toLowerCase();return!e.has(i)&&(e.add(i),!0)})}const o=Number(this.config.max_items??5);return!isNaN(o)&&o>0&&(s=s.slice(0,o)),s}_acknowledge(e){if(!this.config.hide_on_click)return;if(!e.isToday&&!e.isTomorrow)return;const t=`wcs_ack_${e.entityId}_${e.types[0]||e.friendlyName}_${e.dateText}`;localStorage.setItem(t,"true"),this.requestUpdate()}render(){if(!this.hass)return null;const e=this._getEntities().filter(Boolean);let t=this._parseEntities();const i=this.config.language||this.hass.language||"en",s=0===e.length;s&&(t=[{entityId:"stub.bio",friendlyName:"Biotonne",daysTo:0,dateText:(new Date).toLocaleDateString(i),types:["Bio"],icon:"mdi:leaf",color:"#4caf50",isToday:!0,isTomorrow:!1,isAcknowledged:!1},{entityId:"stub.paper",friendlyName:"Altpapier",daysTo:1,dateText:new Date(Date.now()+864e5).toLocaleDateString(i),types:["Papier"],icon:"mdi:package-variant",color:"#2196f3",isToday:!1,isTomorrow:!0,isAcknowledged:!1},{entityId:"stub.rest",friendlyName:"Restmüll",daysTo:5,dateText:new Date(Date.now()+432e6).toLocaleDateString(i),types:["Restmüll"],icon:"mdi:trash-can",color:"#707070",isToday:!1,isTomorrow:!1,isAcknowledged:!1}]);const o=s?t:t.filter(e=>!e.isAcknowledged&&((!this.config.hide_on_today||!e.isToday)&&!(void 0!==this.config.hide_before&&this.config.hide_before>-1&&e.daysTo>this.config.hide_before)));if(0===o.length)return B``;const n=this.config.due_color||"#f44336",r=this.config.due_1_color||"#ff9800";return B`
      <div 
        class="wcs-card ${this.config.layout?`layout-${this.config.layout}`:""}"
        style="
          --rgb-due-color: ${ve(n)};
          --rgb-due-1-color: ${ve(r)};
        "
      >
        ${!this.config.hide_title&&this.config.title?B`
              <div class="wcs-header" style="${this.config.title_size?`font-size: ${this.config.title_size};`:""}">
                ${this.config.title}
              </div>
            `:""}

        <div class="wcs-container ${this.config.layout?`layout-${this.config.layout}`:""}">
          ${o.map(e=>this._renderItem(e,i))}
        </div>
      </div>
    `}_renderItem(e,t){let i="";i=e.isToday?me("state.today","","",t):e.isTomorrow?me("state.tomorrow","","",t):1===e.daysTo?me("state.1_day","","",t):me("state.in_days","{days}",String(e.daysTo),t);let s=e.color;e.isToday&&this.config.due_color?s=this.config.due_color:e.isTomorrow&&this.config.due_1_color&&(s=this.config.due_1_color);const o=["wcs-item",this.config.layout?`layout-${this.config.layout}`:"",e.isToday?"due-today":"",e.isTomorrow?"due-tomorrow":""].filter(Boolean).join(" ");return B`
      <div 
        class="${o}"
        @click="${()=>this._acknowledge(e)}"
      >
        ${this.config.hide_icon?"":B`
              <div class="wcs-icon-wrapper ${this.config.layout?`layout-${this.config.layout}`:""}">
                <ha-icon
                  icon="${e.icon}"
                  style="
                    color: ${s};
                    --mdc-icon-size: ${this.config.icon_size||"30px"};
                    width: ${this.config.icon_size||"30px"};
                    height: ${this.config.icon_size||"30px"};
                  "
                ></ha-icon>
              </div>
            `}

        <div class="wcs-content ${this.config.layout?`layout-${this.config.layout}`:""}">
          <div 
            class="wcs-name ${this.config.layout?`layout-${this.config.layout}`:""}"
            style="${this.config.title_size?`font-size: ${this.config.title_size};`:""}"
          >
            ${e.friendlyName}
          </div>
          
          <div 
            class="wcs-details ${this.config.layout?`layout-${this.config.layout}`:""}"
            style="${this.config.details_size?`font-size: ${this.config.details_size};`:""}"
          >
            ${!this.config.hide_date&&e.dateText?B`<span class="wcs-date">${e.dateText}</span>`:""}
            
            ${this.config.hide_days?"":B`
                  <span class="wcs-badge ${e.isToday?"today":e.isTomorrow?"tomorrow":"upcoming"}">
                    ${i}
                  </span>
                `}
          </div>
        </div>
      </div>
    `}};e([pe({attribute:!1}),t("design:type",Object)],Se.prototype,"hass",void 0),e([ge(),t("design:type",Object)],Se.prototype,"config",void 0),Se=e([de("waste-collection-schedule-card")],Se),window.customCards=window.customCards||[],window.customCards.push({type:"waste-collection-schedule-card",name:"Waste Collection Schedule Card",description:"A modern Lovelace card for Home Assistant waste collection schedules.",preview:!0});export{Se as WasteCollectionScheduleCard};
