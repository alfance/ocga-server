import{r as reactExports,R as React,bP as IconCollapsePanelLeft,bQ as IconClipboard,j as jsxRuntimeExports,bR as IconLinkOut,aK as Colors,O as Dimensions,bS as IconVolumeOff,bT as IconVolumeLow,bU as IconVolumeMedium,bV as IconVolumeHigh,e as clsx,bW as IconPictureInPicture,bX as IconVideoCamera,bY as IconCamera,bZ as IconFullscreenExit,b_ as IconFullscreenEnter,bs as IconUpload,b$ as IconX,c0 as IconCaretDown,c1 as IconCompare,c2 as IconLayout,c3 as IconCircleFill,c4 as IconCircleI,c5 as IconCircleExclamationPointFill,c6 as IconWarningFill,bE as IconPlay,c7 as IconStop,c8 as IconSettings,c9 as IconCollapsePanelUp,ca as IconCollapsePanelDown}from"./hawkins-assets-BF4YVd_V.js";import{S as StreamingMode,M as MultiSourceLogPanel,a as MOCK_GAMEPLAY_ROTATE_INTERVAL_MS,b as MOCK_GAMEPLAY_SCREENS,c as createProgress,u as useLogErrorWarningEvents,d as useSessionTimelineMetrics,g as generatePerformanceSummary,e as SessionTimelineChart,i as isVirtualOcgaSession,f as isOcga2026Session,h as SessionSettingsContent,N as NetworkActivityTable,H as HoverCardTooltip,j as SopAccountDropdownFooter,k as SopAccountDropdownItem,l as SopAccountDropdownEmpty,m as useSessionSettings,n as useSessionGameLogs,o as useControllerLogs,D as DEFAULT_CAPTURE_INTERVAL_MS,p as DEFAULT_SCREENSHOT_QUALITY,q as usePeriodicScreenshots,r as SessionSummaryBanner}from"./SopAccountDropdown-C2BeFb0J.js";import{L as LogLevel,S as StartGameError,d as distExports,m as mapSavedEnvVarsToModel,c as createError,f as fetch$1,u as useFeature,a as useControllerBeacon,b as useFullStory,e as createToast,g as createWarning,h as useSearchParams,i as download,j as LoadingStepLabels,k as useModal,l as useAppQueryParams,C as ChartType,n as SessionTimelineDataProvider,o as ChartProvider,p as create$3,q as create$2,r as create$7,s as create$6,t as useEnvVariables,v as useForm,w as o,x as useFieldArray,F as FormProvider,y as useSopAccounts,P as PlayerBlobContent,B as BuildState,z as keyFromOptions,R as ROUTE_SESSIONS,A as formatBytes,D as useSessionTimelinePanel,E as useGamingClient,G as useGameChannels,H as useTelemetry,I as useControllerQRCode,J as GameError,K as Content,M as Layout,N as BuildSelectionMismatchError,O as ErrorCode}from"./index-CTqDrwBd.js";import{u as useQuery}from"./tanstack-react-query-C5hnoIU5.js";import"./netflix-internal-game-input-CNVDx95H.js";import"./netflix-internal-react-vizkit-BHyrjj_w.js";import{R as ReactDOM,B as Button,a8 as ToggleButtonGroup,a9 as ToggleButton,z as Tooltip,I as Input,a7 as HawkinsProvider,aa as SkeletonLoader,S as Stack,p as ContextualBanner,c as ButtonGroup,H as HoverCard,y as Paper,ab as Slider,V as NotificationBadge,g as Centered,L as Loader,T as Text,o as Heading,ac as Divider,ad as Toggle,G as MenuItem,C as Checkbox,d as Dropdown,Q as getFuzzyFilterOption,ae as Chip,Z as TextLink,af as SplitButton}from"./hawkins-components-wbrWuSTF.js";import{e as extractBeaconCode,b as buildControllerUrl}from"./buildControllerUrl-BxBWQogA.js";import{h as hooks}from"./hawkins-table-CU8j-Wml.js";import{u as useNgpConfig}from"./useNgpConfig-DhmCZ9nt.js";import{E as EnvVarTable}from"./EnvVarTable-BeymZT3-.js";import{D as DropdownTrigger}from"./DropdownTrigger-yZV8hZQf.js";import"./graphql-daVlnb_t.js";import"./ocga-proto-CSRA3Ug0.js";import"./lodash-es-Bf6bYm15.js";import"./uuid-DHGxFwSQ.js";import"./hawkins-community-user-authentication-B66hrNN2.js";/* empty css                                        */const ITERATIONS=10,ENCRYPT_ALGO="AES-GCM",IV_LENGTH=12,SALT_LENGTH=16,DIGEST_ALGO="SHA-256",getDerivedKey=async(secret,salt)=>{const key=await window.crypto.subtle.importKey("raw",new TextEncoder().encode(secret),"PBKDF2",!1,["deriveKey"]);return window.crypto.subtle.deriveKey({name:"PBKDF2",salt,iterations:ITERATIONS,hash:DIGEST_ALGO},key,{name:ENCRYPT_ALGO,length:256},!1,["encrypt","decrypt"])},decrypt=async(secret,data)=>{try{const dataBuffer=Uint8Array.from(atob(data),c=>c.charCodeAt(0)),salt=dataBuffer.slice(0,SALT_LENGTH),iv=dataBuffer.slice(SALT_LENGTH,SALT_LENGTH+IV_LENGTH),encryptedData=dataBuffer.slice(SALT_LENGTH+IV_LENGTH),key=await getDerivedKey(secret,salt),decryptedData=await window.crypto.subtle.decrypt({name:ENCRYPT_ALGO,iv},key,encryptedData);return new TextDecoder().decode(decryptedData)}catch(error){return console.error(`Decryption Error: ${error}`),""}},useSecretKey=()=>{const{data:secretKey,isLoading,isFetched}=useQuery({queryKey:["user-key"],queryFn:({signal})=>fetch("/api/user/key",{method:"PUT",signal}).then(response=>response.json()).then(response=>response.key),gcTime:864e5});return{secretKey,isLoading,isFetched}};function useGamingClientMonitor(shouldInitialize,gamingClient,options){const[sdpDebug,setSpdDebug]=reactExports.useState({}),[loadingProgress,setLoadingProgress]=reactExports.useState({step:"connecting",stepLabel:"Connecting to server",progress:0,gameLoadPercent:0}),onLogRef=reactExports.useRef(options.onLog),onErrorRef=reactExports.useRef(options.onError),onMetricRef=reactExports.useRef(options.onMetric),logForwardingOptionsRef=reactExports.useRef(options.logForwardingOptions);reactExports.useEffect(()=>{onLogRef.current=options.onLog,onErrorRef.current=options.onError,onMetricRef.current=options.onMetric,logForwardingOptionsRef.current=options.logForwardingOptions},[options.onLog,options.onError,options.onMetric,options.logForwardingOptions]);const handleLog=reactExports.useCallback(({logEntry})=>{if(logEntry.topic==="SDP"){const message=logEntry.messageItems[0];setSpdDebug(prev=>({...prev,[message.type]:message}))}const onLog=onLogRef.current;if(!onLog)return;const forwardOpts=logForwardingOptionsRef.current??{},minLevel=forwardOpts.minLevel??LogLevel.INFO;logEntry.level<minLevel||forwardOpts.includedTopics&&!forwardOpts.includedTopics.includes(logEntry.topic)||forwardOpts.excludedTopics?.includes(logEntry.topic)||onLog(logEntry)},[]);reactExports.useEffect(()=>(gamingClient.addEventListener("log",handleLog),()=>gamingClient.removeEventListener("log",handleLog)),[gamingClient,handleLog]),reactExports.useEffect(()=>{const handleMetric=event=>{onMetricRef.current?.(event)};return gamingClient.addEventListener("playermetric",handleMetric),()=>gamingClient.removeEventListener("playermetric",handleMetric)},[gamingClient]),reactExports.useEffect(()=>{const handleLoadingProgress=event=>{setLoadingProgress({step:event.step,stepLabel:event.stepLabel,progress:event.progress,gameLoadPercent:event.gameLoadPercent})};return gamingClient.addEventListener("loadingprogress",handleLoadingProgress),()=>gamingClient.removeEventListener("loadingprogress",handleLoadingProgress)},[gamingClient]),reactExports.useEffect(()=>{shouldInitialize||setLoadingProgress({step:"connecting",stepLabel:"Connecting to server",progress:0,gameLoadPercent:0})},[shouldInitialize]);const hasStartedRef=reactExports.useRef(!1);return reactExports.useEffect(()=>{shouldInitialize||(hasStartedRef.current=!1)},[shouldInitialize]),reactExports.useEffect(()=>{if(!shouldInitialize||hasStartedRef.current)return;hasStartedRef.current=!0,(async()=>{try{if(!options.sopAccountEmail&&!options.sopAccountPin)throw new StartGameError("Please select a test account to play the game","Invalid test account");if(!options.sopAccountEmail||!options.sopAccountPin)throw new StartGameError("Email or PIN missing for the selected test account. Please verify and try again.","Invalid test account");const videoParentElement=globalThis.document.getElementById("video_canvas")??void 0;if(!videoParentElement)throw new StartGameError("Video container not found. Please refresh the page and try again.","Video container missing");await gamingClient.start(options.sopAccountEmail,options.sopAccountPin,{signalingServer:options.signalingServer,videoParentElement},options.ocgaOverrides,options.controllerEnv,options.testbedVersion),await gamingClient.setGameVisibility(distExports.GameVisibility.VISIBLE)}catch(e){onErrorRef.current?.(e)}})()},[shouldInitialize,gamingClient,options.signalingServer,options.sopAccountEmail,options.sopAccountPin,options.ocgaOverrides,options.controllerEnv,options.testbedVersion]),{sdpDebug,loadingProgress}}const ENV_OPTIONS_KEY="ncgt_envOptions",useEnvOptions=({selectedGame})=>{const[allEnvOptions,setAllEnvOptions]=reactExports.useState(()=>{try{const raw=localStorage.getItem(ENV_OPTIONS_KEY);return raw?mapSavedEnvVarsToModel(JSON.parse(raw)):{}}catch{return{}}}),selectedEnvOptions=reactExports.useMemo(()=>selectedGame?allEnvOptions[selectedGame.value]??[]:[],[allEnvOptions,selectedGame]),setSelectedEnvOptions=reactExports.useCallback(newEnvOptions=>{selectedGame&&setAllEnvOptions(prev=>{const newValue={...prev,[selectedGame.value]:newEnvOptions};return localStorage.setItem(ENV_OPTIONS_KEY,JSON.stringify(newValue)),newValue})},[selectedGame]),encryptedEnvOptions=new URLSearchParams(window.location.search).get("encryptedEnvVariables");if(encryptedEnvOptions){const{secretKey}=useSecretKey();reactExports.useEffect(()=>{if(!secretKey)return;(async()=>{try{const decryptedEnvOptions=await decrypt(secretKey,encryptedEnvOptions),envOptions=JSON.parse(decryptedEnvOptions),transformed=Array.isArray(envOptions)?envOptions.map(option=>({key:String(option.key??""),value:String(option.value??""),enabled:option.enabled!==!1})):[];setSelectedEnvOptions(transformed)}catch(e){console.error("Failed to decrypt env options from URL:",e)}})()},[secretKey,encryptedEnvOptions,setSelectedEnvOptions])}return{selectedEnvOptions,setSelectedEnvOptions}},formatControllerOptions=data=>data?[data.defaultController,...data?.alternateControllers??[]].filter(controller=>!!controller).map((controller,i)=>({value:controller.id,label:controller.name,default:i===0,config:controller.config})):(createError({title:"Missing controller config",body:"No controller configuration found for the build",options:{id:"build-missing-controller-config"}}),[]),useGameControllers=(gameId,buildKey)=>{const[selectedController,setSelectedController]=reactExports.useState(),{data,isLoading}=useQuery({enabled:!!gameId&&!!buildKey,queryKey:["game_controllers",gameId,buildKey],queryFn:async({signal})=>fetch$1(`/api/games/${gameId}/builds/${buildKey}/controllers`,{}).then(res=>res.json())}),controllerOptions=reactExports.useMemo(()=>data?.data?formatControllerOptions(data.data):[],[data?.data]),sideloadedControllerUrl=reactExports.useMemo(()=>data?.data.sideloadedControllerUrl,[data?.data]);return reactExports.useEffect(()=>{if(isLoading){setSelectedController(()=>{});return}if(controllerOptions){const controller=controllerOptions.find(c=>c.default);setSelectedController(()=>controller?.value);return}},[controllerOptions,isLoading]),{controllerOptions,isLoading,sideloadedControllerUrl,selectedController,setSelectedController}};var ControllerEnvironment=(ControllerEnvironment2=>(ControllerEnvironment2.TESTBED="TESTBED",ControllerEnvironment2.PROD="PROD",ControllerEnvironment2.DEFAULT="DEFAULT",ControllerEnvironment2))(ControllerEnvironment||{});const CONTROLLER_ENV_STORAGE_KEY="ncgt_ssicEnv",TESTBED_VERSION_STORAGE_KEY="ncgt_ssicTestbedVersion",TESTBED_VERSION_LATEST="latest",useSsicWindow=({qrCodeUrl,config,passport=""})=>{const[showSSIC,setShowSSIC]=reactExports.useState(!1),[controllerEnv,setControllerEnv]=reactExports.useState("PROD"),[testbedVersion,setTestbedVersion]=reactExports.useState(TESTBED_VERSION_LATEST),ssicWindow=reactExports.useRef(null);return reactExports.useEffect(()=>{const controllerEnvironmentStoredValue=localStorage.getItem(CONTROLLER_ENV_STORAGE_KEY);controllerEnvironmentStoredValue==="TESTBED"&&setControllerEnv(controllerEnvironmentStoredValue);const storedVersion=localStorage.getItem(TESTBED_VERSION_STORAGE_KEY);storedVersion&&setTestbedVersion(storedVersion)},[]),reactExports.useEffect(()=>{controllerEnv==="TESTBED"?(localStorage.setItem(CONTROLLER_ENV_STORAGE_KEY,"TESTBED"),testbedVersion&&localStorage.setItem(TESTBED_VERSION_STORAGE_KEY,testbedVersion)):localStorage.removeItem(CONTROLLER_ENV_STORAGE_KEY)},[controllerEnv,testbedVersion]),reactExports.useEffect(()=>{let ssicClosedTimer;if(showSSIC&&!ssicWindow.current){const url=`/ssic?url=${encodeURIComponent(qrCodeUrl??"")}&min=${config.minSSIC}&max=${config.maxSSIC}&passport=${passport}&beacon=true`;ssicWindow.current=window.open(url,"Portal - Virtual Controller","width=1000,height=600,left=800,top=200,popup"),ssicClosedTimer=window.setInterval(()=>{ssicWindow.current?.closed&&(window.clearInterval(ssicClosedTimer),setShowSSIC(!1))},300)}else!showSSIC&&ssicWindow.current&&(ssicWindow.current.close(),ssicWindow.current=null);return()=>window.clearInterval(ssicClosedTimer)},[showSSIC,qrCodeUrl,config.maxSSIC,config.minSSIC,passport]),reactExports.useEffect(()=>{const closeSSIC=()=>{setShowSSIC(!1)};return window.addEventListener("beforeunload",closeSSIC),()=>window.removeEventListener("beforeunload",closeSSIC)},[]),{showSSIC,setShowSSIC,controllerEnv,setControllerEnv,testbedVersion,setTestbedVersion}},UNIQUE_CLIENT_ID_KEY="uniqueClientId",useUniqueClientId=()=>reactExports.useMemo(()=>{let savedClientId=localStorage.getItem(UNIQUE_CLIENT_ID_KEY);return savedClientId||(savedClientId=(Math.random()+1).toString(36).substring(2).toUpperCase(),localStorage.setItem(UNIQUE_CLIENT_ID_KEY,savedClientId)),savedClientId},[]),PASSPORT_KEY="passport";async function fetchPassport({signal,sopAccountEmail,clientId}){const response=await fetch("/api/access/passport",{signal,method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sopAccountEmail,clientId})});if(!response.ok){const errorData=await response.text();throw new Error(`Fetch failed with status ${response.status}: ${errorData}`)}return response.json()}const usePassport=(sopAccountEmail,clientId)=>{const query=useQuery({queryKey:[PASSPORT_KEY,sopAccountEmail,clientId],queryFn:({signal})=>fetchPassport({signal,sopAccountEmail,clientId}),enabled:!!sopAccountEmail}),{error,isError}=query,devMode=!1;return reactExports.useEffect(()=>{isError&&!devMode&&createError({title:"Error getting controller passport",body:`${error?.message}`,options:{id:"passport-fetch-error"}})},[error,isError,devMode]),query},initLock=async ref=>{if(!ref.current)if(navigator.wakeLock)try{ref.current=await navigator.wakeLock.request()}catch(err){console.error(`WakeLock: ${err.name}, ${err.message}`)}else console.log("WakeLock: Unsupported")},useWakeLock=enabled=>{const ref=reactExports.useRef();return reactExports.useLayoutEffect(()=>{enabled?initLock(ref):(ref.current?.release(),ref.current=void 0)},[ref,enabled]),{released:ref.current?.released??!0}};/**
 * dockview-core
 * @version 5.2.0
 * @link https://github.com/mathuo/dockview
 * @license MIT
 */function styleInject$1(css,ref){ref===void 0&&(ref={});var insertAt=ref.insertAt;if(!(typeof document>"u")){var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css",insertAt==="top"&&head.firstChild?head.insertBefore(style,head.firstChild):head.appendChild(style),style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css))}}var css_248z$1=`.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-replit {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  box-sizing: border-box;
  padding: 10px;
  background-color: #ebeced;
  --dv-group-view-background-color: #ebeced;
  --dv-tabs-and-actions-container-background-color: #fcfcfc;
  --dv-activegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-activegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-sash-color: #cfd1d3;
  --dv-active-sash-color: #babbbb;
}
.dockview-theme-replit .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-replit .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-replit .dv-resize-container {
  border-radius: 10px !important;
  border: none;
}
.dockview-theme-replit .dv-groupview {
  overflow: hidden;
  border-radius: 10px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container {
  border-bottom: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab {
  margin: 4px;
  border-radius: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab:hover {
  background-color: #e4e5e6 !important;
}
.dockview-theme-replit .dv-groupview .dv-content-container {
  background-color: #fcfcfc;
}
.dockview-theme-replit .dv-groupview.dv-active-group {
  border: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview.dv-inactive-group {
  border: 1px solid transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 4px;
  width: 40px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 40px;
  width: 4px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-border: 2px solid var(--dv-color-abyss-accent);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: var(--dv-color-abyss-dark);
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-drag-over-border: 2px solid rgb(91, 30, 207);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #f6f5f9;
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: 2px solid rgba(255, 255, 255, 0.1);
}
.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
  contain: layout;
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: 0.5;
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color);
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus:before, .dv-pane-container .dv-pane .dv-pane-header:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus:before, .dv-pane-container .dv-pane .dv-pane-body:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-within, .dv-tab:focus {
  position: relative;
}
.dv-tab:focus-within::after, .dv-tab:focus::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /* Track */
  /* Handle */
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  -webkit-user-drag: element;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
}
.dv-tab.dv-tab--shifting {
  will-change: margin-left;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-watermark {
  display: flex;
  height: 100%;
}`;styleInject$1(css_248z$1);class TransferObject{}class PanelTransfer extends TransferObject{constructor(viewId,groupId,panelId){super(),this.viewId=viewId,this.groupId=groupId,this.panelId=panelId}}class PaneTransfer extends TransferObject{constructor(viewId,paneId){super(),this.viewId=viewId,this.paneId=paneId}}class LocalSelectionTransfer{constructor(){}static getInstance(){return LocalSelectionTransfer.INSTANCE}hasData(proto){return proto&&proto===this.proto}clearData(proto){this.hasData(proto)&&(this.proto=void 0,this.data=void 0)}getData(proto){if(this.hasData(proto))return this.data}setData(data,proto){proto&&(this.data=data,this.proto=proto)}}LocalSelectionTransfer.INSTANCE=new LocalSelectionTransfer;function getPanelData(){const panelTransfer=LocalSelectionTransfer.getInstance();if(panelTransfer.hasData(PanelTransfer.prototype))return panelTransfer.getData(PanelTransfer.prototype)[0]}function getPaneData(){const paneTransfer=LocalSelectionTransfer.getInstance();if(paneTransfer.hasData(PaneTransfer.prototype))return paneTransfer.getData(PaneTransfer.prototype)[0]}var Event$1;(function(Event2){Event2.any=(...children)=>listener=>{const disposables=children.map(child=>child(listener));return{dispose:()=>{disposables.forEach(d=>{d.dispose()})}}}})(Event$1||(Event$1={}));class DockviewEvent{constructor(){this._defaultPrevented=!1}get defaultPrevented(){return this._defaultPrevented}preventDefault(){this._defaultPrevented=!0}}class AcceptableEvent{constructor(){this._isAccepted=!1}get isAccepted(){return this._isAccepted}accept(){this._isAccepted=!0}}class LeakageMonitor{constructor(){this.events=new Map}get size(){return this.events.size}add(event,stacktrace){this.events.set(event,stacktrace)}delete(event){this.events.delete(event)}clear(){this.events.clear()}}class Stacktrace{static create(){var _a;return new Stacktrace((_a=new Error().stack)!==null&&_a!==void 0?_a:"")}constructor(value2){this.value=value2}print(){console.warn("dockview: stacktrace",this.value)}}class Listener{constructor(callback,stacktrace){this.callback=callback,this.stacktrace=stacktrace}}class Emitter{static setLeakageMonitorEnabled(isEnabled){isEnabled!==Emitter.ENABLE_TRACKING&&Emitter.MEMORY_LEAK_WATCHER.clear(),Emitter.ENABLE_TRACKING=isEnabled}get value(){return this._last}constructor(options){this.options=options,this._listeners=[],this._disposed=!1}get event(){return this._event||(this._event=callback=>{var _a;!((_a=this.options)===null||_a===void 0)&&_a.replay&&this._last!==void 0&&callback(this._last);const listener=new Listener(callback,Emitter.ENABLE_TRACKING?Stacktrace.create():void 0);return this._listeners.push(listener),{dispose:()=>{const index=this._listeners.indexOf(listener);index>-1&&this._listeners.splice(index,1)}}},Emitter.ENABLE_TRACKING&&Emitter.MEMORY_LEAK_WATCHER.add(this._event,Stacktrace.create())),this._event}fire(e){var _a;!((_a=this.options)===null||_a===void 0)&&_a.replay&&(this._last=e);for(const listener of this._listeners)listener.callback(e)}dispose(){this._disposed||(this._disposed=!0,this._listeners.length>0&&(Emitter.ENABLE_TRACKING&&queueMicrotask(()=>{var _a;for(const listener of this._listeners)console.warn("dockview: stacktrace",(_a=listener.stacktrace)===null||_a===void 0?void 0:_a.print())}),this._listeners=[]),Emitter.ENABLE_TRACKING&&this._event&&Emitter.MEMORY_LEAK_WATCHER.delete(this._event))}}Emitter.ENABLE_TRACKING=!1;Emitter.MEMORY_LEAK_WATCHER=new LeakageMonitor;function addDisposableListener(element,type,listener,options){return element.addEventListener(type,listener,options),{dispose:()=>{element.removeEventListener(type,listener,options)}}}class AsapEvent{constructor(){this._onFired=new Emitter,this._currentFireCount=0,this._queued=!1,this.onEvent=e=>{const fireCountAtTimeOfEventSubscription=this._currentFireCount;return this._onFired.event(()=>{this._currentFireCount>fireCountAtTimeOfEventSubscription&&e()})}}fire(){this._currentFireCount++,!this._queued&&(this._queued=!0,queueMicrotask(()=>{this._queued=!1,this._onFired.fire()}))}dispose(){this._onFired.dispose()}}var Disposable;(function(Disposable2){Disposable2.NONE={dispose:()=>{}};function from(func){return{dispose:()=>{func()}}}Disposable2.from=from})(Disposable||(Disposable={}));class CompositeDisposable{get isDisposed(){return this._isDisposed}constructor(...args){this._isDisposed=!1,this._disposables=new Set(args)}addDisposables(...args){args.forEach(arg=>this._disposables.add(arg))}removeDisposable(disposable){this._disposables.delete(disposable)}dispose(){this._isDisposed||(this._isDisposed=!0,this._disposables.forEach(arg=>arg.dispose()),this._disposables.clear())}}class MutableDisposable{constructor(){this._disposable=Disposable.NONE}set value(disposable){this._disposable&&this._disposable.dispose(),this._disposable=disposable}dispose(){this._disposable&&(this._disposable.dispose(),this._disposable=Disposable.NONE)}}class OverflowObserver extends CompositeDisposable{constructor(el){super(),this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._value=null,this.addDisposables(this._onDidChange,watchElementResize(el,entry=>{const hasScrollX=entry.target.scrollWidth>entry.target.clientWidth,hasScrollY=entry.target.scrollHeight>entry.target.clientHeight;this._value={hasScrollX,hasScrollY},this._onDidChange.fire(this._value)}))}}function watchElementResize(element,cb){const observer=new ResizeObserver(entires=>{requestAnimationFrame(()=>{const firstEntry=entires[0];cb(firstEntry)})});return observer.observe(element),{dispose:()=>{observer.unobserve(element),observer.disconnect()}}}const removeClasses=(element,...classes)=>{for(const classname of classes)element.classList.contains(classname)&&element.classList.remove(classname)},addClasses=(element,...classes)=>{for(const classname of classes)element.classList.contains(classname)||element.classList.add(classname)},toggleClass=(element,className,isToggled)=>{const hasClass=element.classList.contains(className);isToggled&&!hasClass&&element.classList.add(className),!isToggled&&hasClass&&element.classList.remove(className)};function isAncestor(testChild,testAncestor){for(;testChild;){if(testChild===testAncestor)return!0;testChild=testChild.parentNode}return!1}function trackFocus(element){return new FocusTracker(element)}class FocusTracker extends CompositeDisposable{constructor(element){super(),this._onDidFocus=new Emitter,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new Emitter,this.onDidBlur=this._onDidBlur.event,this.addDisposables(this._onDidFocus,this._onDidBlur);let hasFocus=isAncestor(document.activeElement,element),loosingFocus=!1;const onFocus=()=>{loosingFocus=!1,hasFocus||(hasFocus=!0,this._onDidFocus.fire())},onBlur=()=>{hasFocus&&(loosingFocus=!0,window.setTimeout(()=>{loosingFocus&&(loosingFocus=!1,hasFocus=!1,this._onDidBlur.fire())},0))};this._refreshStateHandler=()=>{isAncestor(document.activeElement,element)!==hasFocus&&(hasFocus?onBlur():onFocus())},this.addDisposables(addDisposableListener(element,"focus",onFocus,!0)),this.addDisposables(addDisposableListener(element,"blur",onBlur,!0))}refreshState(){this._refreshStateHandler()}}const QUASI_PREVENT_DEFAULT_KEY="dv-quasiPreventDefault";function quasiPreventDefault(event){event[QUASI_PREVENT_DEFAULT_KEY]=!0}function quasiDefaultPrevented(event){return event[QUASI_PREVENT_DEFAULT_KEY]}function addStyles(document2,styleSheetList){const styleSheets=Array.from(styleSheetList);for(const styleSheet of styleSheets){if(styleSheet.href){const link=document2.createElement("link");link.href=styleSheet.href,link.type=styleSheet.type,link.rel="stylesheet",document2.head.appendChild(link)}let cssTexts=[];try{styleSheet.cssRules&&(cssTexts=Array.from(styleSheet.cssRules).map(rule=>rule.cssText))}catch{}for(const rule of cssTexts){const style=document2.createElement("style");style.appendChild(document2.createTextNode(rule)),document2.head.appendChild(style)}}}function getDomNodePagePosition(domNode){const{left,top,width,height}=domNode.getBoundingClientRect();return{left:left+window.scrollX,top:top+window.scrollY,width,height}}function isInDocument(element){let currentElement=element;for(;currentElement?.parentNode;){if(currentElement.parentNode===document)return!0;currentElement.parentNode instanceof DocumentFragment?currentElement=currentElement.parentNode.host:currentElement=currentElement.parentNode}return!1}function addTestId(element,id){element.setAttribute("data-testid",id)}function allTagsNamesInclusiveOfShadowDoms(tagNames){const iframes=[];function findIframesInNode(node){if(node.nodeType===Node.ELEMENT_NODE){tagNames.includes(node.tagName)&&iframes.push(node),node.shadowRoot&&findIframesInNode(node.shadowRoot);for(const child of node.children)findIframesInNode(child)}}return findIframesInNode(document.documentElement),iframes}function disableIframePointEvents(rootNode=document){const iframes=allTagsNamesInclusiveOfShadowDoms(["IFRAME","WEBVIEW"]),original=new WeakMap;for(const iframe of iframes)original.set(iframe,iframe.style.pointerEvents),iframe.style.pointerEvents="none";return{release:()=>{var _a;for(const iframe of iframes)iframe.style.pointerEvents=(_a=original.get(iframe))!==null&&_a!==void 0?_a:"auto";iframes.splice(0,iframes.length)}}}function getDockviewTheme(element){function toClassList(element2){const list=[];for(let i=0;i<element2.classList.length;i++)list.push(element2.classList.item(i));return list}let theme,parent=element;for(;parent!==null&&(theme=toClassList(parent).find(cls=>cls.startsWith("dockview-theme-")),typeof theme!="string");)parent=parent.parentElement;return theme}class Classnames{constructor(element){this.element=element,this._classNames=[]}setClassNames(classNames){for(const className of this._classNames)toggleClass(this.element,className,!1);this._classNames=classNames.split(" ").filter(v=>v.trim().length>0);for(const className of this._classNames)toggleClass(this.element,className,!0)}}const DEBOUCE_DELAY=100;function isChildEntirelyVisibleWithinParent(child,parent){const childPosition=getDomNodePagePosition(child),parentPosition=getDomNodePagePosition(parent);return!(childPosition.left<parentPosition.left||childPosition.left+childPosition.width>parentPosition.left+parentPosition.width||childPosition.top<parentPosition.top||childPosition.top+childPosition.height>parentPosition.top+parentPosition.height)}function onDidWindowMoveEnd(window2){const emitter=new Emitter;let previousScreenX=window2.screenX,previousScreenY=window2.screenY,timeout;const checkMovement=()=>{if(window2.closed)return;const currentScreenX=window2.screenX,currentScreenY=window2.screenY;(currentScreenX!==previousScreenX||currentScreenY!==previousScreenY)&&(clearTimeout(timeout),timeout=setTimeout(()=>{emitter.fire()},DEBOUCE_DELAY),previousScreenX=currentScreenX,previousScreenY=currentScreenY),requestAnimationFrame(checkMovement)};return checkMovement(),emitter}function onDidWindowResizeEnd(element,cb){let resizeTimeout;return new CompositeDisposable(addDisposableListener(element,"resize",()=>{clearTimeout(resizeTimeout),resizeTimeout=setTimeout(()=>{cb()},DEBOUCE_DELAY)}))}function shiftAbsoluteElementIntoView(element,root,options={buffer:10}){const buffer=options.buffer,rect=element.getBoundingClientRect(),rootRect=root.getBoundingClientRect();let translateX=0,translateY=0;const left=rect.left-rootRect.left,top=rect.top-rootRect.top,bottom=rect.bottom-rootRect.bottom,right=rect.right-rootRect.right;left<buffer?translateX=buffer-left:right>buffer&&(translateX=-buffer-right),top<buffer?translateY=buffer-top:bottom>buffer&&(translateY=-bottom-buffer),(translateX!==0||translateY!==0)&&(element.style.transform=`translate(${translateX}px, ${translateY}px)`)}function findRelativeZIndexParent(el){let tmp=el;for(;tmp&&(tmp.style.zIndex==="auto"||tmp.style.zIndex==="");)tmp=tmp.parentElement;return tmp}function tail(arr){if(arr.length===0)throw new Error("Invalid tail call");return[arr.slice(0,arr.length-1),arr[arr.length-1]]}function sequenceEquals(arr1,arr2){if(arr1.length!==arr2.length)return!1;for(let i=0;i<arr1.length;i++)if(arr1[i]!==arr2[i])return!1;return!0}function pushToStart(arr,value2){const index=arr.indexOf(value2);index>-1&&(arr.splice(index,1),arr.unshift(value2))}function pushToEnd(arr,value2){const index=arr.indexOf(value2);index>-1&&(arr.splice(index,1),arr.push(value2))}function firstIndex(array,fn){for(let i=0;i<array.length;i++){const element=array[i];if(fn(element))return i}return-1}function remove(array,value2){const index=array.findIndex(t=>t===value2);return index>-1?(array.splice(index,1),!0):!1}const clamp=(value2,min,max)=>min>max?min:Math.min(max,Math.max(value2,min)),sequentialNumberGenerator=()=>{let value2=1;return{next:()=>(value2++).toString()}},range=(from,to)=>{const result=[];if(typeof to!="number"&&(to=from,from=0),from<=to)for(let i=from;i<to;i++)result.push(i);else for(let i=from;i>to;i--)result.push(i);return result};class ViewItem{set size(size){this._size=size}get size(){return this._size}get cachedVisibleSize(){return this._cachedVisibleSize}get visible(){return typeof this._cachedVisibleSize>"u"}get minimumSize(){return this.visible?this.view.minimumSize:0}get viewMinimumSize(){return this.view.minimumSize}get maximumSize(){return this.visible?this.view.maximumSize:0}get viewMaximumSize(){return this.view.maximumSize}get priority(){return this.view.priority}get snap(){return!!this.view.snap}set enabled(enabled){this.container.style.pointerEvents=enabled?"":"none"}constructor(container2,view,size,disposable){this.container=container2,this.view=view,this.disposable=disposable,this._cachedVisibleSize=void 0,typeof size=="number"?(this._size=size,this._cachedVisibleSize=void 0,container2.classList.add("visible")):(this._size=0,this._cachedVisibleSize=size.cachedVisibleSize)}setVisible(visible,size){var _a;visible!==this.visible&&(visible?(this.size=clamp((_a=this._cachedVisibleSize)!==null&&_a!==void 0?_a:0,this.viewMinimumSize,this.viewMaximumSize),this._cachedVisibleSize=void 0):(this._cachedVisibleSize=typeof size=="number"?size:this.size,this.size=0),this.container.classList.toggle("visible",visible),this.view.setVisible&&this.view.setVisible(visible))}dispose(){return this.disposable.dispose(),this.view}}var Orientation;(function(Orientation2){Orientation2.HORIZONTAL="HORIZONTAL",Orientation2.VERTICAL="VERTICAL"})(Orientation||(Orientation={}));var SashState;(function(SashState2){SashState2[SashState2.MAXIMUM=0]="MAXIMUM",SashState2[SashState2.MINIMUM=1]="MINIMUM",SashState2[SashState2.DISABLED=2]="DISABLED",SashState2[SashState2.ENABLED=3]="ENABLED"})(SashState||(SashState={}));var LayoutPriority;(function(LayoutPriority2){LayoutPriority2.Low="low",LayoutPriority2.High="high",LayoutPriority2.Normal="normal"})(LayoutPriority||(LayoutPriority={}));var Sizing;(function(Sizing2){Sizing2.Distribute={type:"distribute"};function Split(index){return{type:"split",index}}Sizing2.Split=Split;function Invisible(cachedVisibleSize){return{type:"invisible",cachedVisibleSize}}Sizing2.Invisible=Invisible})(Sizing||(Sizing={}));class Splitview{get contentSize(){return this._contentSize}get size(){return this._size}set size(value2){this._size=value2}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(value2){this._orthogonalSize=value2}get length(){return this.viewItems.length}get proportions(){return this._proportions?[...this._proportions]:void 0}get orientation(){return this._orientation}set orientation(value2){this._orientation=value2;const tmp=this.size;this.size=this.orthogonalSize,this.orthogonalSize=tmp,removeClasses(this.element,"dv-horizontal","dv-vertical"),this.element.classList.add(this.orientation==Orientation.HORIZONTAL?"dv-horizontal":"dv-vertical")}get minimumSize(){return this.viewItems.reduce((r,item)=>r+item.minimumSize,0)}get maximumSize(){return this.length===0?Number.POSITIVE_INFINITY:this.viewItems.reduce((r,item)=>r+item.maximumSize,0)}get startSnappingEnabled(){return this._startSnappingEnabled}set startSnappingEnabled(startSnappingEnabled){this._startSnappingEnabled!==startSnappingEnabled&&(this._startSnappingEnabled=startSnappingEnabled,this.updateSashEnablement())}get endSnappingEnabled(){return this._endSnappingEnabled}set endSnappingEnabled(endSnappingEnabled){this._endSnappingEnabled!==endSnappingEnabled&&(this._endSnappingEnabled=endSnappingEnabled,this.updateSashEnablement())}get disabled(){return this._disabled}set disabled(value2){this._disabled=value2,toggleClass(this.element,"dv-splitview-disabled",value2)}get margin(){return this._margin}set margin(value2){this._margin=value2,toggleClass(this.element,"dv-splitview-has-margin",value2!==0)}constructor(container2,options){var _a,_b;this.container=container2,this.viewItems=[],this.sashes=[],this._size=0,this._orthogonalSize=0,this._contentSize=0,this._proportions=void 0,this._startSnappingEnabled=!0,this._endSnappingEnabled=!0,this._disabled=!1,this._margin=0,this._onDidSashEnd=new Emitter,this.onDidSashEnd=this._onDidSashEnd.event,this._onDidAddView=new Emitter,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new Emitter,this.onDidRemoveView=this._onDidRemoveView.event,this.resize=(index,delta,sizes=this.viewItems.map(x=>x.size),lowPriorityIndexes,highPriorityIndexes,overloadMinDelta=Number.NEGATIVE_INFINITY,overloadMaxDelta=Number.POSITIVE_INFINITY,snapBefore,snapAfter)=>{if(index<0||index>this.viewItems.length)return 0;const upIndexes=range(index,-1),downIndexes=range(index+1,this.viewItems.length);if(highPriorityIndexes)for(const i of highPriorityIndexes)pushToStart(upIndexes,i),pushToStart(downIndexes,i);if(lowPriorityIndexes)for(const i of lowPriorityIndexes)pushToEnd(upIndexes,i),pushToEnd(downIndexes,i);const upItems=upIndexes.map(i=>this.viewItems[i]),upSizes=upIndexes.map(i=>sizes[i]),downItems=downIndexes.map(i=>this.viewItems[i]),downSizes=downIndexes.map(i=>sizes[i]),minDeltaUp=upIndexes.reduce((_,i)=>_+this.viewItems[i].minimumSize-sizes[i],0),maxDeltaUp=upIndexes.reduce((_,i)=>_+this.viewItems[i].maximumSize-sizes[i],0),maxDeltaDown=downIndexes.length===0?Number.POSITIVE_INFINITY:downIndexes.reduce((_,i)=>_+sizes[i]-this.viewItems[i].minimumSize,0),minDeltaDown=downIndexes.length===0?Number.NEGATIVE_INFINITY:downIndexes.reduce((_,i)=>_+sizes[i]-this.viewItems[i].maximumSize,0),minDelta=Math.max(minDeltaUp,minDeltaDown),maxDelta=Math.min(maxDeltaDown,maxDeltaUp);let snapped=!1;if(snapBefore){const snapView=this.viewItems[snapBefore.index],visible=delta>=snapBefore.limitDelta;snapped=visible!==snapView.visible,snapView.setVisible(visible,snapBefore.size)}if(!snapped&&snapAfter){const snapView=this.viewItems[snapAfter.index],visible=delta<snapAfter.limitDelta;snapped=visible!==snapView.visible,snapView.setVisible(visible,snapAfter.size)}if(snapped)return this.resize(index,delta,sizes,lowPriorityIndexes,highPriorityIndexes,overloadMinDelta,overloadMaxDelta);const tentativeDelta=clamp(delta,minDelta,maxDelta);let actualDelta=0,deltaUp=tentativeDelta;for(let i=0;i<upItems.length;i++){const item=upItems[i],size=clamp(upSizes[i]+deltaUp,item.minimumSize,item.maximumSize),viewDelta=size-upSizes[i];actualDelta+=viewDelta,deltaUp-=viewDelta,item.size=size}let deltaDown=actualDelta;for(let i=0;i<downItems.length;i++){const item=downItems[i],size=clamp(downSizes[i]-deltaDown,item.minimumSize,item.maximumSize),viewDelta=size-downSizes[i];deltaDown+=viewDelta,item.size=size}return delta},this._orientation=(_a=options.orientation)!==null&&_a!==void 0?_a:Orientation.VERTICAL,this.element=this.createContainer(),this.margin=(_b=options.margin)!==null&&_b!==void 0?_b:0,this.proportionalLayout=options.proportionalLayout===void 0?!0:!!options.proportionalLayout,this.viewContainer=this.createViewContainer(),this.sashContainer=this.createSashContainer(),this.element.appendChild(this.sashContainer),this.element.appendChild(this.viewContainer),this.container.appendChild(this.element),this.style(options.styles),options.descriptor&&(this._size=options.descriptor.size,options.descriptor.views.forEach((viewDescriptor,index)=>{const sizing=viewDescriptor.visible===void 0||viewDescriptor.visible?viewDescriptor.size:{type:"invisible",cachedVisibleSize:viewDescriptor.size},view=viewDescriptor.view;this.addView(view,sizing,index,!0)}),this._contentSize=this.viewItems.reduce((r,i)=>r+i.size,0),this.saveProportions())}style(styles2){styles2?.separatorBorder==="transparent"?(removeClasses(this.element,"dv-separator-border"),this.element.style.removeProperty("--dv-separator-border")):(addClasses(this.element,"dv-separator-border"),styles2?.separatorBorder&&this.element.style.setProperty("--dv-separator-border",styles2.separatorBorder))}isViewVisible(index){if(index<0||index>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[index].visible}setViewVisible(index,visible){if(index<0||index>=this.viewItems.length)throw new Error("Index out of bounds");const viewItem=this.viewItems[index];viewItem.setVisible(visible,viewItem.size),this.distributeEmptySpace(index),this.layoutViews(),this.saveProportions()}getViewSize(index){return index<0||index>=this.viewItems.length?-1:this.viewItems[index].size}resizeView(index,size){if(index<0||index>=this.viewItems.length)return;const indexes=range(this.viewItems.length).filter(i=>i!==index),lowPriorityIndexes=[...indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.Low),index],highPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.High),item=this.viewItems[index];size=Math.round(size),size=clamp(size,item.minimumSize,Math.min(item.maximumSize,this._size)),item.size=size,this.relayout(lowPriorityIndexes,highPriorityIndexes)}getViews(){return this.viewItems.map(x=>x.view)}onDidChange(item,size){const index=this.viewItems.indexOf(item);if(index<0||index>=this.viewItems.length)return;size=typeof size=="number"?size:item.size,size=clamp(size,item.minimumSize,item.maximumSize),item.size=size;const indexes=range(this.viewItems.length).filter(i=>i!==index),lowPriorityIndexes=[...indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.Low),index],highPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.High);this.relayout([...lowPriorityIndexes,index],highPriorityIndexes)}addView(view,size={type:"distribute"},index=this.viewItems.length,skipLayout){const container2=document.createElement("div");container2.className="dv-view",container2.appendChild(view.element);let viewSize;typeof size=="number"?viewSize=size:size.type==="split"?viewSize=this.getViewSize(size.index)/2:size.type==="invisible"?viewSize={cachedVisibleSize:size.cachedVisibleSize}:viewSize=view.minimumSize;const disposable=view.onDidChange(newSize=>this.onDidChange(viewItem,newSize.size)),viewItem=new ViewItem(container2,view,viewSize,{dispose:()=>{disposable.dispose(),this.viewContainer.removeChild(container2)}});if(index===this.viewItems.length?this.viewContainer.appendChild(container2):this.viewContainer.insertBefore(container2,this.viewContainer.children.item(index)),this.viewItems.splice(index,0,viewItem),this.viewItems.length>1){const sash=document.createElement("div");sash.className="dv-sash";const onPointerStart=event=>{for(const item of this.viewItems)item.enabled=!1;const iframes=disableIframePointEvents(),start=this._orientation===Orientation.HORIZONTAL?event.clientX:event.clientY,sashIndex=firstIndex(this.sashes,s=>s.container===sash),sizes=this.viewItems.map(x=>x.size);let snapBefore,snapAfter;const upIndexes=range(sashIndex,-1),downIndexes=range(sashIndex+1,this.viewItems.length),minDeltaUp=upIndexes.reduce((r,i)=>r+(this.viewItems[i].minimumSize-sizes[i]),0),maxDeltaUp=upIndexes.reduce((r,i)=>r+(this.viewItems[i].viewMaximumSize-sizes[i]),0),maxDeltaDown=downIndexes.length===0?Number.POSITIVE_INFINITY:downIndexes.reduce((r,i)=>r+(sizes[i]-this.viewItems[i].minimumSize),0),minDeltaDown=downIndexes.length===0?Number.NEGATIVE_INFINITY:downIndexes.reduce((r,i)=>r+(sizes[i]-this.viewItems[i].viewMaximumSize),0),minDelta=Math.max(minDeltaUp,minDeltaDown),maxDelta=Math.min(maxDeltaDown,maxDeltaUp),snapBeforeIndex=this.findFirstSnapIndex(upIndexes),snapAfterIndex=this.findFirstSnapIndex(downIndexes);if(typeof snapBeforeIndex=="number"){const snappedViewItem=this.viewItems[snapBeforeIndex],halfSize=Math.floor(snappedViewItem.viewMinimumSize/2);snapBefore={index:snapBeforeIndex,limitDelta:snappedViewItem.visible?minDelta-halfSize:minDelta+halfSize,size:snappedViewItem.size}}if(typeof snapAfterIndex=="number"){const snappedViewItem=this.viewItems[snapAfterIndex],halfSize=Math.floor(snappedViewItem.viewMinimumSize/2);snapAfter={index:snapAfterIndex,limitDelta:snappedViewItem.visible?maxDelta+halfSize:maxDelta-halfSize,size:snappedViewItem.size}}const onPointerMove=event2=>{const delta=(this._orientation===Orientation.HORIZONTAL?event2.clientX:event2.clientY)-start;this.resize(sashIndex,delta,sizes,void 0,void 0,minDelta,maxDelta,snapBefore,snapAfter),this.distributeEmptySpace(),this.layoutViews()},end=()=>{for(const item of this.viewItems)item.enabled=!0;iframes.release(),this.saveProportions(),document.removeEventListener("pointermove",onPointerMove),document.removeEventListener("pointerup",end),document.removeEventListener("pointercancel",end),document.removeEventListener("contextmenu",end),this._onDidSashEnd.fire(void 0)};document.addEventListener("pointermove",onPointerMove),document.addEventListener("pointerup",end),document.addEventListener("pointercancel",end),document.addEventListener("contextmenu",end)};sash.addEventListener("pointerdown",onPointerStart);const sashItem={container:sash,disposable:()=>{sash.removeEventListener("pointerdown",onPointerStart),this.sashContainer.removeChild(sash)}};this.sashContainer.appendChild(sash),this.sashes.push(sashItem)}skipLayout||this.relayout([index]),!skipLayout&&typeof size!="number"&&size.type==="distribute"&&this.distributeViewSizes(),this._onDidAddView.fire(view)}distributeViewSizes(){const flexibleViewItems=[];let flexibleSize=0;for(const item of this.viewItems)item.maximumSize-item.minimumSize>0&&(flexibleViewItems.push(item),flexibleSize+=item.size);const size=Math.floor(flexibleSize/flexibleViewItems.length);for(const item of flexibleViewItems)item.size=clamp(size,item.minimumSize,item.maximumSize);const indexes=range(this.viewItems.length),lowPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.Low),highPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.High);this.relayout(lowPriorityIndexes,highPriorityIndexes)}removeView(index,sizing,skipLayout=!1){const viewItem=this.viewItems.splice(index,1)[0];if(viewItem.dispose(),this.viewItems.length>=1){const sashIndex=Math.max(index-1,0);this.sashes.splice(sashIndex,1)[0].disposable()}return skipLayout||this.relayout(),sizing&&sizing.type==="distribute"&&this.distributeViewSizes(),this._onDidRemoveView.fire(viewItem.view),viewItem.view}getViewCachedVisibleSize(index){if(index<0||index>=this.viewItems.length)throw new Error("Index out of bounds");return this.viewItems[index].cachedVisibleSize}moveView(from,to){const cachedVisibleSize=this.getViewCachedVisibleSize(from),sizing=typeof cachedVisibleSize>"u"?this.getViewSize(from):Sizing.Invisible(cachedVisibleSize),view=this.removeView(from,void 0,!0);this.addView(view,sizing,to)}layout(size,orthogonalSize){const previousSize=Math.max(this.size,this._contentSize);if(this.size=size,this.orthogonalSize=orthogonalSize,this.proportions){let total=0;for(let i=0;i<this.viewItems.length;i++){const item=this.viewItems[i],proportion=this.proportions[i];typeof proportion=="number"?total+=proportion:size-=item.size}for(let i=0;i<this.viewItems.length;i++){const item=this.viewItems[i],proportion=this.proportions[i];typeof proportion=="number"&&total>0&&(item.size=clamp(Math.round(proportion*size/total),item.minimumSize,item.maximumSize))}}else{const indexes=range(this.viewItems.length),lowPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.Low),highPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.High);this.resize(this.viewItems.length-1,size-previousSize,void 0,lowPriorityIndexes,highPriorityIndexes)}this.distributeEmptySpace(),this.layoutViews()}relayout(lowPriorityIndexes,highPriorityIndexes){const contentSize=this.viewItems.reduce((r,i)=>r+i.size,0);this.resize(this.viewItems.length-1,this._size-contentSize,void 0,lowPriorityIndexes,highPriorityIndexes),this.distributeEmptySpace(),this.layoutViews(),this.saveProportions()}distributeEmptySpace(lowPriorityIndex){const contentSize=this.viewItems.reduce((r,i)=>r+i.size,0);let emptyDelta=this.size-contentSize;const indexes=range(this.viewItems.length-1,-1),lowPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.Low),highPriorityIndexes=indexes.filter(i=>this.viewItems[i].priority===LayoutPriority.High);for(const index of highPriorityIndexes)pushToStart(indexes,index);for(const index of lowPriorityIndexes)pushToEnd(indexes,index);typeof lowPriorityIndex=="number"&&pushToEnd(indexes,lowPriorityIndex);for(let i=0;emptyDelta!==0&&i<indexes.length;i++){const item=this.viewItems[indexes[i]],size=clamp(item.size+emptyDelta,item.minimumSize,item.maximumSize),viewDelta=size-item.size;emptyDelta-=viewDelta,item.size=size}}saveProportions(){this.proportionalLayout&&this._contentSize>0&&(this._proportions=this.viewItems.map(i=>i.visible?i.size/this._contentSize:void 0))}layoutViews(){if(this._contentSize=this.viewItems.reduce((r,i)=>r+i.size,0),this.updateSashEnablement(),this.viewItems.length===0)return;const visibleViewItems=this.viewItems.filter(i=>i.visible),sashCount=Math.max(0,visibleViewItems.length-1),marginReducedSize=this.margin*sashCount/Math.max(1,visibleViewItems.length);let totalLeftOffset=0;const viewLeftOffsets=[],sashWidth=4,runningVisiblePanelCount=this.viewItems.reduce((arr,viewItem,i)=>{const flag=viewItem.visible?1:0;return i===0?arr.push(flag):arr.push(arr[i-1]+flag),arr},[]);this.viewItems.forEach((view,i)=>{totalLeftOffset+=this.viewItems[i].size,viewLeftOffsets.push(totalLeftOffset);const size=view.visible?view.size-marginReducedSize:0,visiblePanelsBeforeThisView=Math.max(0,runningVisiblePanelCount[i]-1),offset=i===0||visiblePanelsBeforeThisView===0?0:viewLeftOffsets[i-1]+visiblePanelsBeforeThisView/sashCount*marginReducedSize;if(i<this.viewItems.length-1){const newSize=view.visible?offset+size-sashWidth/2+this.margin/2:offset;this._orientation===Orientation.HORIZONTAL&&(this.sashes[i].container.style.left=`${newSize}px`,this.sashes[i].container.style.top="0px"),this._orientation===Orientation.VERTICAL&&(this.sashes[i].container.style.left="0px",this.sashes[i].container.style.top=`${newSize}px`)}this._orientation===Orientation.HORIZONTAL&&(view.container.style.width=`${size}px`,view.container.style.left=`${offset}px`,view.container.style.top="",view.container.style.height=""),this._orientation===Orientation.VERTICAL&&(view.container.style.height=`${size}px`,view.container.style.top=`${offset}px`,view.container.style.width="",view.container.style.left=""),view.view.layout(view.size-marginReducedSize,this._orthogonalSize)})}findFirstSnapIndex(indexes){for(const index of indexes){const viewItem=this.viewItems[index];if(viewItem.visible&&viewItem.snap)return index}for(const index of indexes){const viewItem=this.viewItems[index];if(viewItem.visible&&viewItem.maximumSize-viewItem.minimumSize>0)return;if(!viewItem.visible&&viewItem.snap)return index}}updateSashEnablement(){let previous=!1;const collapsesDown=this.viewItems.map(i=>previous=i.size-i.minimumSize>0||previous);previous=!1;const expandsDown=this.viewItems.map(i=>previous=i.maximumSize-i.size>0||previous),reverseViews=[...this.viewItems].reverse();previous=!1;const collapsesUp=reverseViews.map(i=>previous=i.size-i.minimumSize>0||previous).reverse();previous=!1;const expandsUp=reverseViews.map(i=>previous=i.maximumSize-i.size>0||previous).reverse();let position=0;for(let index=0;index<this.sashes.length;index++){const sash=this.sashes[index],viewItem=this.viewItems[index];position+=viewItem.size;const min=!(collapsesDown[index]&&expandsUp[index+1]),max=!(expandsDown[index]&&collapsesUp[index+1]);if(min&&max){const upIndexes=range(index,-1),downIndexes=range(index+1,this.viewItems.length),snapBeforeIndex=this.findFirstSnapIndex(upIndexes),snapAfterIndex=this.findFirstSnapIndex(downIndexes),snappedBefore=typeof snapBeforeIndex=="number"&&!this.viewItems[snapBeforeIndex].visible,snappedAfter=typeof snapAfterIndex=="number"&&!this.viewItems[snapAfterIndex].visible;snappedBefore&&collapsesUp[index]&&(position>0||this.startSnappingEnabled)?this.updateSash(sash,SashState.MINIMUM):snappedAfter&&collapsesDown[index]&&(position<this._contentSize||this.endSnappingEnabled)?this.updateSash(sash,SashState.MAXIMUM):this.updateSash(sash,SashState.DISABLED)}else min&&!max?this.updateSash(sash,SashState.MINIMUM):!min&&max?this.updateSash(sash,SashState.MAXIMUM):this.updateSash(sash,SashState.ENABLED)}}updateSash(sash,state){toggleClass(sash.container,"dv-disabled",state===SashState.DISABLED),toggleClass(sash.container,"dv-enabled",state===SashState.ENABLED),toggleClass(sash.container,"dv-maximum",state===SashState.MAXIMUM),toggleClass(sash.container,"dv-minimum",state===SashState.MINIMUM)}createViewContainer(){const element=document.createElement("div");return element.className="dv-view-container",element}createSashContainer(){const element=document.createElement("div");return element.className="dv-sash-container",element}createContainer(){const element=document.createElement("div"),orientationClassname=this._orientation===Orientation.HORIZONTAL?"dv-horizontal":"dv-vertical";return element.className=`dv-split-view-container ${orientationClassname}`,element}dispose(){this._onDidSashEnd.dispose(),this._onDidAddView.dispose(),this._onDidRemoveView.dispose();for(let i=0;i<this.element.children.length;i++)if(this.element.children.item(i)===this.element){this.element.removeChild(this.element);break}for(const viewItem of this.viewItems)viewItem.dispose();this.element.remove()}}const PROPERTY_KEYS_SPLITVIEW=Object.keys({orientation:void 0,descriptor:void 0,proportionalLayout:void 0,styles:void 0,margin:void 0,disableAutoResizing:void 0,className:void 0});class Paneview extends CompositeDisposable{get onDidAddView(){return this.splitview.onDidAddView}get onDidRemoveView(){return this.splitview.onDidRemoveView}get minimumSize(){return this.splitview.minimumSize}get maximumSize(){return this.splitview.maximumSize}get orientation(){return this.splitview.orientation}get size(){return this.splitview.size}get orthogonalSize(){return this.splitview.orthogonalSize}constructor(container2,options){var _a;super(),this.paneItems=[],this.skipAnimation=!1,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._orientation=(_a=options.orientation)!==null&&_a!==void 0?_a:Orientation.VERTICAL,this.element=document.createElement("div"),this.element.className="dv-pane-container",container2.appendChild(this.element),this.splitview=new Splitview(this.element,{orientation:this._orientation,proportionalLayout:!1,descriptor:options.descriptor}),this.getPanes().forEach(pane=>{const disposable=new CompositeDisposable(pane.onDidChangeExpansionState(()=>{this.setupAnimation(),this._onDidChange.fire(void 0)})),paneItem={pane,disposable:{dispose:()=>{disposable.dispose()}}};this.paneItems.push(paneItem),pane.orthogonalSize=this.splitview.orthogonalSize}),this.addDisposables(this._onDidChange,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire(void 0)}),this.splitview.onDidAddView(()=>{this._onDidChange.fire()}),this.splitview.onDidRemoveView(()=>{this._onDidChange.fire()}))}setViewVisible(index,visible){this.splitview.setViewVisible(index,visible)}addPane(pane,size,index=this.splitview.length,skipLayout=!1){const disposable=pane.onDidChangeExpansionState(()=>{this.setupAnimation(),this._onDidChange.fire(void 0)}),paneItem={pane,disposable:{dispose:()=>{disposable.dispose()}}};this.paneItems.splice(index,0,paneItem),pane.orthogonalSize=this.splitview.orthogonalSize,this.splitview.addView(pane,size,index,skipLayout)}getViewSize(index){return this.splitview.getViewSize(index)}getPanes(){return this.splitview.getViews()}removePane(index,options={skipDispose:!1}){const paneItem=this.paneItems.splice(index,1)[0];return this.splitview.removeView(index),options.skipDispose||(paneItem.disposable.dispose(),paneItem.pane.dispose()),paneItem}moveView(from,to){if(from===to)return;const view=this.removePane(from,{skipDispose:!0});this.skipAnimation=!0;try{this.addPane(view.pane,view.pane.size,to,!1)}finally{this.skipAnimation=!1}}layout(size,orthogonalSize){this.splitview.layout(size,orthogonalSize)}setupAnimation(){this.skipAnimation||(this.animationTimer&&(clearTimeout(this.animationTimer),this.animationTimer=void 0),addClasses(this.element,"dv-animated"),this.animationTimer=setTimeout(()=>{this.animationTimer=void 0,removeClasses(this.element,"dv-animated")},200))}dispose(){super.dispose(),this.animationTimer&&(clearTimeout(this.animationTimer),this.animationTimer=void 0),this.paneItems.forEach(paneItem=>{paneItem.disposable.dispose(),paneItem.pane.dispose()}),this.paneItems=[],this.splitview.dispose(),this.element.remove()}}class LeafNode{get minimumWidth(){return this.view.minimumWidth}get maximumWidth(){return this.view.maximumWidth}get minimumHeight(){return this.view.minimumHeight}get maximumHeight(){return this.view.maximumHeight}get priority(){return this.view.priority}get snap(){return this.view.snap}get minimumSize(){return this.orientation===Orientation.HORIZONTAL?this.minimumHeight:this.minimumWidth}get maximumSize(){return this.orientation===Orientation.HORIZONTAL?this.maximumHeight:this.maximumWidth}get minimumOrthogonalSize(){return this.orientation===Orientation.HORIZONTAL?this.minimumWidth:this.minimumHeight}get maximumOrthogonalSize(){return this.orientation===Orientation.HORIZONTAL?this.maximumWidth:this.maximumHeight}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get element(){return this.view.element}get width(){return this.orientation===Orientation.HORIZONTAL?this.orthogonalSize:this.size}get height(){return this.orientation===Orientation.HORIZONTAL?this.size:this.orthogonalSize}constructor(view,orientation,orthogonalSize,size=0){this.view=view,this.orientation=orientation,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._orthogonalSize=orthogonalSize,this._size=size,this._disposable=this.view.onDidChange(event=>{event?this._onDidChange.fire({size:this.orientation===Orientation.VERTICAL?event.width:event.height,orthogonalSize:this.orientation===Orientation.VERTICAL?event.height:event.width}):this._onDidChange.fire({})})}setVisible(visible){this.view.setVisible&&this.view.setVisible(visible)}layout(size,orthogonalSize){this._size=size,this._orthogonalSize=orthogonalSize,this.view.layout(this.width,this.height)}dispose(){this._onDidChange.dispose(),this._disposable.dispose()}}class BranchNode extends CompositeDisposable{get width(){return this.orientation===Orientation.HORIZONTAL?this.size:this.orthogonalSize}get height(){return this.orientation===Orientation.HORIZONTAL?this.orthogonalSize:this.size}get minimumSize(){return this.children.length===0?0:Math.max(...this.children.map((c,index)=>this.splitview.isViewVisible(index)?c.minimumOrthogonalSize:0))}get maximumSize(){return Math.min(...this.children.map((c,index)=>this.splitview.isViewVisible(index)?c.maximumOrthogonalSize:Number.POSITIVE_INFINITY))}get minimumOrthogonalSize(){return this.splitview.minimumSize}get maximumOrthogonalSize(){return this.splitview.maximumSize}get orthogonalSize(){return this._orthogonalSize}get size(){return this._size}get minimumWidth(){return this.orientation===Orientation.HORIZONTAL?this.minimumOrthogonalSize:this.minimumSize}get minimumHeight(){return this.orientation===Orientation.HORIZONTAL?this.minimumSize:this.minimumOrthogonalSize}get maximumWidth(){return this.orientation===Orientation.HORIZONTAL?this.maximumOrthogonalSize:this.maximumSize}get maximumHeight(){return this.orientation===Orientation.HORIZONTAL?this.maximumSize:this.maximumOrthogonalSize}get priority(){if(this.children.length===0)return LayoutPriority.Normal;const priorities=this.children.map(c=>typeof c.priority>"u"?LayoutPriority.Normal:c.priority);return priorities.some(p=>p===LayoutPriority.High)?LayoutPriority.High:priorities.some(p=>p===LayoutPriority.Low)?LayoutPriority.Low:LayoutPriority.Normal}get disabled(){return this.splitview.disabled}set disabled(value2){this.splitview.disabled=value2}get margin(){return this.splitview.margin}set margin(value2){this.splitview.margin=value2,this.children.forEach(child=>{child instanceof BranchNode&&(child.margin=value2)})}constructor(orientation,proportionalLayout,styles2,size,orthogonalSize,disabled,margin,childDescriptors){if(super(),this.orientation=orientation,this.proportionalLayout=proportionalLayout,this.styles=styles2,this._childrenDisposable=Disposable.NONE,this.children=[],this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._onDidVisibilityChange=new Emitter,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._orthogonalSize=orthogonalSize,this._size=size,this.element=document.createElement("div"),this.element.className="dv-branch-node",!childDescriptors)this.splitview=new Splitview(this.element,{orientation:this.orientation,proportionalLayout,styles:styles2,margin}),this.splitview.layout(this.size,this.orthogonalSize);else{const descriptor={views:childDescriptors.map(childDescriptor=>({view:childDescriptor.node,size:childDescriptor.node.size,visible:childDescriptor.node instanceof LeafNode&&childDescriptor.visible!==void 0?childDescriptor.visible:!0})),size:this.orthogonalSize};this.children=childDescriptors.map(c=>c.node),this.splitview=new Splitview(this.element,{orientation:this.orientation,descriptor,proportionalLayout,styles:styles2,margin})}this.disabled=disabled,this.addDisposables(this._onDidChange,this._onDidVisibilityChange,this.splitview.onDidSashEnd(()=>{this._onDidChange.fire({})})),this.setupChildrenEvents()}setVisible(_visible){}isChildVisible(index){if(index<0||index>=this.children.length)throw new Error("Invalid index");return this.splitview.isViewVisible(index)}setChildVisible(index,visible){if(index<0||index>=this.children.length)throw new Error("Invalid index");if(this.splitview.isViewVisible(index)===visible)return;const wereAllChildrenHidden=this.splitview.contentSize===0;this.splitview.setViewVisible(index,visible);const areAllChildrenHidden=this.splitview.contentSize===0;(visible&&wereAllChildrenHidden||!visible&&areAllChildrenHidden)&&this._onDidVisibilityChange.fire({visible})}moveChild(from,to){if(from===to)return;if(from<0||from>=this.children.length)throw new Error("Invalid from index");from<to&&to--,this.splitview.moveView(from,to);const child=this._removeChild(from);this._addChild(child,to)}getChildSize(index){if(index<0||index>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewSize(index)}resizeChild(index,size){if(index<0||index>=this.children.length)throw new Error("Invalid index");this.splitview.resizeView(index,size)}layout(size,orthogonalSize){this._size=orthogonalSize,this._orthogonalSize=size,this.splitview.layout(orthogonalSize,size)}addChild(node,size,index,skipLayout){if(index<0||index>this.children.length)throw new Error("Invalid index");this.splitview.addView(node,size,index,skipLayout),this._addChild(node,index)}getChildCachedVisibleSize(index){if(index<0||index>=this.children.length)throw new Error("Invalid index");return this.splitview.getViewCachedVisibleSize(index)}removeChild(index,sizing){if(index<0||index>=this.children.length)throw new Error("Invalid index");return this.splitview.removeView(index,sizing),this._removeChild(index)}_addChild(node,index){this.children.splice(index,0,node),this.setupChildrenEvents()}_removeChild(index){const[child]=this.children.splice(index,1);return this.setupChildrenEvents(),child}setupChildrenEvents(){this._childrenDisposable.dispose(),this._childrenDisposable=new CompositeDisposable(Event$1.any(...this.children.map(c=>c.onDidChange))(e=>{this._onDidChange.fire({size:e.orthogonalSize})}),...this.children.map((c,i)=>c instanceof BranchNode?c.onDidVisibilityChange(({visible})=>{this.setChildVisible(i,visible)}):Disposable.NONE))}dispose(){this._childrenDisposable.dispose(),this.splitview.dispose(),this.children.forEach(child=>child.dispose()),super.dispose()}}function findLeaf(candiateNode,last){if(candiateNode instanceof LeafNode)return candiateNode;if(candiateNode instanceof BranchNode)return findLeaf(candiateNode.children[last?candiateNode.children.length-1:0],last);throw new Error("invalid node")}function cloneNode(node,size,orthogonalSize){if(node instanceof BranchNode){const result=new BranchNode(node.orientation,node.proportionalLayout,node.styles,size,orthogonalSize,node.disabled,node.margin);for(let i=node.children.length-1;i>=0;i--){const child=node.children[i];result.addChild(cloneNode(child,child.size,child.orthogonalSize),child.size,0,!0)}return result}else return new LeafNode(node.view,node.orientation,orthogonalSize)}function flipNode(node,size,orthogonalSize){if(node instanceof BranchNode){const result=new BranchNode(orthogonal(node.orientation),node.proportionalLayout,node.styles,size,orthogonalSize,node.disabled,node.margin);let totalSize=0;for(let i=node.children.length-1;i>=0;i--){const child=node.children[i],childSize=child instanceof BranchNode?child.orthogonalSize:child.size;let newSize=node.size===0?0:Math.round(size*childSize/node.size);totalSize+=newSize,i===0&&(newSize+=size-totalSize),result.addChild(flipNode(child,orthogonalSize,newSize),newSize,0,!0)}return result}else return new LeafNode(node.view,orthogonal(node.orientation),orthogonalSize)}function indexInParent(element){const parentElement=element.parentElement;if(!parentElement)throw new Error("Invalid grid element");let el=parentElement.firstElementChild,index=0;for(;el!==element&&el!==parentElement.lastElementChild&&el;)el=el.nextElementSibling,index++;return index}function getGridLocation(element){const parentElement=element.parentElement;if(!parentElement)throw new Error("Invalid grid element");if(/\bdv-grid-view\b/.test(parentElement.className))return[];const index=indexInParent(parentElement),ancestor=parentElement.parentElement.parentElement.parentElement;return[...getGridLocation(ancestor),index]}function getRelativeLocation(rootOrientation,location,direction){const orientation=getLocationOrientation(rootOrientation,location),directionOrientation=getDirectionOrientation(direction);if(orientation===directionOrientation){const[rest,_index]=tail(location);let index=_index;return(direction==="right"||direction==="bottom")&&(index+=1),[...rest,index]}else{const index=direction==="right"||direction==="bottom"?1:0;return[...location,index]}}function getDirectionOrientation(direction){return direction==="top"||direction==="bottom"?Orientation.VERTICAL:Orientation.HORIZONTAL}function getLocationOrientation(rootOrientation,location){return location.length%2===0?orthogonal(rootOrientation):rootOrientation}const orthogonal=orientation=>orientation===Orientation.HORIZONTAL?Orientation.VERTICAL:Orientation.HORIZONTAL;function isGridBranchNode(node){return!!node.children}const serializeBranchNode=(node,orientation)=>{const size=orientation===Orientation.VERTICAL?node.box.width:node.box.height;return isGridBranchNode(node)?{type:"branch",data:node.children.map(c=>serializeBranchNode(c,orthogonal(orientation))),size}:typeof node.cachedVisibleSize=="number"?{type:"leaf",data:node.view.toJSON(),size:node.cachedVisibleSize,visible:!1}:{type:"leaf",data:node.view.toJSON(),size}};class Gridview{get length(){return this._root?this._root.children.length:0}get orientation(){return this.root.orientation}set orientation(orientation){if(this.root.orientation===orientation)return;const{size,orthogonalSize}=this.root;this.root=flipNode(this.root,orthogonalSize,size),this.root.layout(size,orthogonalSize)}get width(){return this.root.width}get height(){return this.root.height}get minimumWidth(){return this.root.minimumWidth}get minimumHeight(){return this.root.minimumHeight}get maximumWidth(){return this.root.maximumHeight}get maximumHeight(){return this.root.maximumHeight}get locked(){return this._locked}set locked(value2){this._locked=value2;const branch=[this.root];for(;branch.length>0;){const node=branch.pop();node instanceof BranchNode&&(node.disabled=value2,branch.push(...node.children))}}get margin(){return this._margin}set margin(value2){this._margin=value2,this.root.margin=value2}maximizedView(){var _a;return(_a=this._maximizedNode)===null||_a===void 0?void 0:_a.leaf.view}hasMaximizedView(){return this._maximizedNode!==void 0}maximizeView(view){var _a;const location=getGridLocation(view.element),[_,node]=this.getNode(location);if(!(node instanceof LeafNode)||((_a=this._maximizedNode)===null||_a===void 0?void 0:_a.leaf)===node)return;this.hasMaximizedView()&&this.exitMaximizedView(),serializeBranchNode(this.getView(),this.orientation);const hiddenOnMaximize=[];function hideAllViewsBut(parent,exclude){for(let i=0;i<parent.children.length;i++){const child=parent.children[i];child instanceof LeafNode?child!==exclude&&(parent.isChildVisible(i)?parent.setChildVisible(i,!1):hiddenOnMaximize.push(child)):hideAllViewsBut(child,exclude)}}hideAllViewsBut(this.root,node),this._maximizedNode={leaf:node,hiddenOnMaximize},this._onDidMaximizedNodeChange.fire({view:node.view,isMaximized:!0})}exitMaximizedView(){if(!this._maximizedNode)return;const hiddenOnMaximize=this._maximizedNode.hiddenOnMaximize;function showViewsInReverseOrder(parent){for(let index=parent.children.length-1;index>=0;index--){const child=parent.children[index];child instanceof LeafNode?hiddenOnMaximize.includes(child)||parent.setChildVisible(index,!0):showViewsInReverseOrder(child)}}showViewsInReverseOrder(this.root);const tmp=this._maximizedNode.leaf;this._maximizedNode=void 0,this._onDidMaximizedNodeChange.fire({view:tmp.view,isMaximized:!1})}serialize(){const maximizedView=this.maximizedView();let maxmizedViewLocation;maximizedView&&(maxmizedViewLocation=getGridLocation(maximizedView.element)),this.hasMaximizedView()&&this.exitMaximizedView();const resullt={root:serializeBranchNode(this.getView(),this.orientation),width:this.width,height:this.height,orientation:this.orientation};return maxmizedViewLocation&&(resullt.maximizedNode={location:maxmizedViewLocation}),maximizedView&&this.maximizeView(maximizedView),resullt}dispose(){this.disposable.dispose(),this._onDidChange.dispose(),this._onDidMaximizedNodeChange.dispose(),this._onDidViewVisibilityChange.dispose(),this.root.dispose(),this._maximizedNode=void 0,this.element.remove()}clear(){const orientation=this.root.orientation;this.root=new BranchNode(orientation,this.proportionalLayout,this.styles,this.root.size,this.root.orthogonalSize,this.locked,this.margin)}deserialize(json,deserializer){const orientation=json.orientation,height=orientation===Orientation.VERTICAL?json.height:json.width;if(this._deserialize(json.root,orientation,deserializer,height),this.layout(json.width,json.height),json.maximizedNode){const location=json.maximizedNode.location,[_,node]=this.getNode(location);if(!(node instanceof LeafNode))return;this.maximizeView(node.view)}}_deserialize(root,orientation,deserializer,orthogonalSize){this.root=this._deserializeNode(root,orientation,deserializer,orthogonalSize)}_deserializeNode(node,orientation,deserializer,orthogonalSize){var _a;let result;if(node.type==="branch"){const children=node.data.map(serializedChild=>({node:this._deserializeNode(serializedChild,orthogonal(orientation),deserializer,node.size),visible:serializedChild.visible}));result=new BranchNode(orientation,this.proportionalLayout,this.styles,node.size,orthogonalSize,this.locked,this.margin,children)}else{const view=deserializer.fromJSON(node);typeof node.visible=="boolean"&&((_a=view.setVisible)===null||_a===void 0||_a.call(view,node.visible)),result=new LeafNode(view,orientation,orthogonalSize,node.size)}return result}get root(){return this._root}set root(root){const oldRoot=this._root;oldRoot&&(oldRoot.dispose(),this._maximizedNode=void 0,this.element.removeChild(oldRoot.element)),this._root=root,this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(e=>{this._onDidChange.fire(e)})}normalize(){if(!this._root||this._root.children.length!==1)return;const oldRoot=this.root,childReference=oldRoot.children[0];if(childReference instanceof LeafNode)return;oldRoot.element.remove();const child=oldRoot.removeChild(0);oldRoot.dispose(),child.dispose(),this._root=cloneNode(childReference,childReference.size,childReference.orthogonalSize),this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(e=>{this._onDidChange.fire(e)})}insertOrthogonalSplitviewAtRoot(){if(!this._root)return;const oldRoot=this.root;if(oldRoot.element.remove(),this._root=new BranchNode(orthogonal(oldRoot.orientation),this.proportionalLayout,this.styles,this.root.orthogonalSize,this.root.size,this.locked,this.margin),oldRoot.children.length!==0)if(oldRoot.children.length===1){const childReference=oldRoot.children[0];oldRoot.removeChild(0).dispose(),oldRoot.dispose(),this._root.addChild(flipNode(childReference,childReference.orthogonalSize,childReference.size),Sizing.Distribute,0)}else this._root.addChild(oldRoot,Sizing.Distribute,0);this.element.appendChild(this._root.element),this.disposable.value=this._root.onDidChange(e=>{this._onDidChange.fire(e)})}next(location){return this.progmaticSelect(location)}previous(location){return this.progmaticSelect(location,!0)}getView(location){const node=location?this.getNode(location)[1]:this.root;return this._getViews(node,this.orientation)}_getViews(node,orientation,cachedVisibleSize){const box={height:node.height,width:node.width};if(node instanceof LeafNode)return{box,view:node.view,cachedVisibleSize};const children=[];for(let i=0;i<node.children.length;i++){const child=node.children[i],nodeCachedVisibleSize=node.getChildCachedVisibleSize(i);children.push(this._getViews(child,orthogonal(orientation),nodeCachedVisibleSize))}return{box,children}}progmaticSelect(location,reverse=!1){const[path,node]=this.getNode(location);if(!(node instanceof LeafNode))throw new Error("invalid location");for(let i=path.length-1;i>-1;i--){const n=path[i],l=location[i]||0;if(reverse?l-1>-1:l+1<n.children.length)return findLeaf(n.children[reverse?l-1:l+1],reverse)}return findLeaf(this.root,reverse)}constructor(proportionalLayout,styles2,orientation,locked,margin){this.proportionalLayout=proportionalLayout,this.styles=styles2,this._locked=!1,this._margin=0,this._maximizedNode=void 0,this.disposable=new MutableDisposable,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._onDidViewVisibilityChange=new Emitter,this.onDidViewVisibilityChange=this._onDidViewVisibilityChange.event,this._onDidMaximizedNodeChange=new Emitter,this.onDidMaximizedNodeChange=this._onDidMaximizedNodeChange.event,this.element=document.createElement("div"),this.element.className="dv-grid-view",this._locked=locked??!1,this._margin=margin??0,this.root=new BranchNode(orientation,proportionalLayout,styles2,0,0,this.locked,this.margin)}isViewVisible(location){const[rest,index]=tail(location),[,parent]=this.getNode(rest);if(!(parent instanceof BranchNode))throw new Error("Invalid from location");return parent.isChildVisible(index)}setViewVisible(location,visible){this.hasMaximizedView()&&this.exitMaximizedView();const[rest,index]=tail(location),[,parent]=this.getNode(rest);if(!(parent instanceof BranchNode))throw new Error("Invalid from location");this._onDidViewVisibilityChange.fire(),parent.setChildVisible(index,visible)}moveView(parentLocation,from,to){this.hasMaximizedView()&&this.exitMaximizedView();const[,parent]=this.getNode(parentLocation);if(!(parent instanceof BranchNode))throw new Error("Invalid location");parent.moveChild(from,to)}addView(view,size,location){this.hasMaximizedView()&&this.exitMaximizedView();const[rest,index]=tail(location),[pathToParent,parent]=this.getNode(rest);if(parent instanceof BranchNode){const node=new LeafNode(view,orthogonal(parent.orientation),parent.orthogonalSize);parent.addChild(node,size,index)}else{const[grandParent,..._]=[...pathToParent].reverse(),[parentIndex,...__]=[...rest].reverse();let newSiblingSize=0;const newSiblingCachedVisibleSize=grandParent.getChildCachedVisibleSize(parentIndex);typeof newSiblingCachedVisibleSize=="number"&&(newSiblingSize=Sizing.Invisible(newSiblingCachedVisibleSize)),grandParent.removeChild(parentIndex).dispose();const newParent=new BranchNode(parent.orientation,this.proportionalLayout,this.styles,parent.size,parent.orthogonalSize,this.locked,this.margin);grandParent.addChild(newParent,parent.size,parentIndex);const newSibling=new LeafNode(parent.view,grandParent.orientation,parent.size);newParent.addChild(newSibling,newSiblingSize,0),typeof size!="number"&&size.type==="split"&&(size={type:"split",index:0});const node=new LeafNode(view,grandParent.orientation,parent.size);newParent.addChild(node,size,index)}}remove(view,sizing){const location=getGridLocation(view.element);return this.removeView(location,sizing)}removeView(location,sizing){this.hasMaximizedView()&&this.exitMaximizedView();const[rest,index]=tail(location),[pathToParent,parent]=this.getNode(rest);if(!(parent instanceof BranchNode))throw new Error("Invalid location");const nodeToRemove=parent.children[index];if(!(nodeToRemove instanceof LeafNode))throw new Error("Invalid location");if(parent.removeChild(index,sizing),nodeToRemove.dispose(),parent.children.length!==1)return nodeToRemove.view;const sibling=parent.children[0];if(pathToParent.length===0)return sibling instanceof LeafNode||(parent.removeChild(0,sizing),this.root=sibling),nodeToRemove.view;const[grandParent,..._]=[...pathToParent].reverse(),[parentIndex,...__]=[...rest].reverse(),isSiblingVisible=parent.isChildVisible(0);parent.removeChild(0,sizing);const sizes=grandParent.children.map((_size,i)=>grandParent.getChildSize(i));if(grandParent.removeChild(parentIndex,sizing).dispose(),sibling instanceof BranchNode){sizes.splice(parentIndex,1,...sibling.children.map(c=>c.size));for(let i=0;i<sibling.children.length;i++){const child=sibling.children[i];grandParent.addChild(child,child.size,parentIndex+i)}for(;sibling.children.length>0;)sibling.removeChild(0)}else{const newSibling=new LeafNode(sibling.view,orthogonal(sibling.orientation),sibling.size),siblingSizing=isSiblingVisible?sibling.orthogonalSize:Sizing.Invisible(sibling.orthogonalSize);grandParent.addChild(newSibling,siblingSizing,parentIndex)}sibling.dispose();for(let i=0;i<sizes.length;i++)grandParent.resizeChild(i,sizes[i]);return nodeToRemove.view}layout(width,height){const[size,orthogonalSize]=this.root.orientation===Orientation.HORIZONTAL?[height,width]:[width,height];this.root.layout(size,orthogonalSize)}getNode(location,node=this.root,path=[]){if(location.length===0)return[path,node];if(!(node instanceof BranchNode))throw new Error("Invalid location");const[index,...rest]=location;if(index<0||index>=node.children.length)throw new Error("Invalid location");const child=node.children[index];return path.push(node),this.getNode(rest,child,path)}}const PROPERTY_KEYS_GRIDVIEW=Object.keys({disableAutoResizing:void 0,proportionalLayout:void 0,orientation:void 0,hideBorders:void 0,className:void 0});class Resizable extends CompositeDisposable{get element(){return this._element}get disableResizing(){return this._disableResizing}set disableResizing(value2){this._disableResizing=value2}constructor(parentElement,disableResizing=!1){super(),this._disableResizing=disableResizing,this._element=parentElement,this.addDisposables(watchElementResize(this._element,entry=>{if(this.isDisposed||this.disableResizing||!this._element.offsetParent||!isInDocument(this._element))return;const{width,height}=entry.contentRect;this.layout(width,height)}))}}const nextLayoutId$1=sequentialNumberGenerator();function toTarget(direction){switch(direction){case"left":return"left";case"right":return"right";case"above":return"top";case"below":return"bottom";case"within":default:return"center"}}class BaseGrid extends Resizable{get id(){return this._id}get size(){return this._groups.size}get groups(){return Array.from(this._groups.values()).map(_=>_.value)}get width(){return this.gridview.width}get height(){return this.gridview.height}get minimumHeight(){return this.gridview.minimumHeight}get maximumHeight(){return this.gridview.maximumHeight}get minimumWidth(){return this.gridview.minimumWidth}get maximumWidth(){return this.gridview.maximumWidth}get activeGroup(){return this._activeGroup}get locked(){return this.gridview.locked}set locked(value2){this.gridview.locked=value2}constructor(container2,options){var _a;super(document.createElement("div"),options.disableAutoResizing),this._id=nextLayoutId$1.next(),this._groups=new Map,this._onDidRemove=new Emitter,this.onDidRemove=this._onDidRemove.event,this._onDidAdd=new Emitter,this.onDidAdd=this._onDidAdd.event,this._onDidMaximizedChange=new Emitter,this.onDidMaximizedChange=this._onDidMaximizedChange.event,this._onDidActiveChange=new Emitter,this.onDidActiveChange=this._onDidActiveChange.event,this._bufferOnDidLayoutChange=new AsapEvent,this.onDidLayoutChange=this._bufferOnDidLayoutChange.onEvent,this._onDidViewVisibilityChangeMicroTaskQueue=new AsapEvent,this.onDidViewVisibilityChangeMicroTaskQueue=this._onDidViewVisibilityChangeMicroTaskQueue.onEvent,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new Classnames(this.element),this._classNames.setClassNames((_a=options.className)!==null&&_a!==void 0?_a:""),container2.appendChild(this.element),this.gridview=new Gridview(!!options.proportionalLayout,options.styles,options.orientation,options.locked,options.margin),this.gridview.locked=!!options.locked,this.element.appendChild(this.gridview.element),this.layout(0,0,!0),this.addDisposables(this.gridview.onDidMaximizedNodeChange(event=>{this._onDidMaximizedChange.fire({panel:event.view,isMaximized:event.isMaximized})}),this.gridview.onDidViewVisibilityChange(()=>this._onDidViewVisibilityChangeMicroTaskQueue.fire()),this.onDidViewVisibilityChangeMicroTaskQueue(()=>{this.layout(this.width,this.height,!0)}),Disposable.from(()=>{var _a2;(_a2=this.element.parentElement)===null||_a2===void 0||_a2.removeChild(this.element)}),this.gridview.onDidChange(()=>{this._bufferOnDidLayoutChange.fire()}),Event$1.any(this.onDidAdd,this.onDidRemove,this.onDidActiveChange)(()=>{this._bufferOnDidLayoutChange.fire()}),this._onDidMaximizedChange,this._onDidViewVisibilityChangeMicroTaskQueue,this._bufferOnDidLayoutChange)}setVisible(panel2,visible){this.gridview.setViewVisible(getGridLocation(panel2.element),visible),this._bufferOnDidLayoutChange.fire()}isVisible(panel2){return this.gridview.isViewVisible(getGridLocation(panel2.element))}updateOptions(options){var _a,_b,_c,_d;options.proportionalLayout,options.orientation&&(this.gridview.orientation=options.orientation),"disableResizing"in options&&(this.disableResizing=(_a=options.disableAutoResizing)!==null&&_a!==void 0?_a:!1),"locked"in options&&(this.locked=(_b=options.locked)!==null&&_b!==void 0?_b:!1),"margin"in options&&(this.gridview.margin=(_c=options.margin)!==null&&_c!==void 0?_c:0),"className"in options&&this._classNames.setClassNames((_d=options.className)!==null&&_d!==void 0?_d:"")}maximizeGroup(panel2){this.gridview.maximizeView(panel2),this.doSetGroupActive(panel2)}isMaximizedGroup(panel2){return this.gridview.maximizedView()===panel2}exitMaximizedGroup(){this.gridview.exitMaximizedView()}hasMaximizedGroup(){return this.gridview.hasMaximizedView()}doAddGroup(group,location=[0],size){this.gridview.addView(group,size??Sizing.Distribute,location),this._onDidAdd.fire(group)}doRemoveGroup(group,options){if(!this._groups.has(group.id))throw new Error("invalid operation");const item=this._groups.get(group.id),view=this.gridview.remove(group,Sizing.Distribute);if(item&&!options?.skipDispose&&(item.disposable.dispose(),item.value.dispose(),this._groups.delete(group.id),this._onDidRemove.fire(group)),!options?.skipActive&&this._activeGroup===group){const groups=Array.from(this._groups.values());this.doSetGroupActive(groups.length>0?groups[0].value:void 0)}return view}getPanel(id){var _a;return(_a=this._groups.get(id))===null||_a===void 0?void 0:_a.value}doSetGroupActive(group){this._activeGroup!==group&&(this._activeGroup&&this._activeGroup.setActive(!1),group&&group.setActive(!0),this._activeGroup=group,this._onDidActiveChange.fire(group))}removeGroup(group){this.doRemoveGroup(group)}moveToNext(options){var _a;if(options||(options={}),!options.group){if(!this.activeGroup)return;options.group=this.activeGroup}const location=getGridLocation(options.group.element),next=(_a=this.gridview.next(location))===null||_a===void 0?void 0:_a.view;this.doSetGroupActive(next)}moveToPrevious(options){var _a;if(options||(options={}),!options.group){if(!this.activeGroup)return;options.group=this.activeGroup}const location=getGridLocation(options.group.element),next=(_a=this.gridview.previous(location))===null||_a===void 0?void 0:_a.view;this.doSetGroupActive(next)}layout(width,height,forceResize){(forceResize||width!==this.width||height!==this.height)&&(this.gridview.element.style.height=`${height}px`,this.gridview.element.style.width=`${width}px`,this.gridview.layout(width,height))}dispose(){this._onDidActiveChange.dispose(),this._onDidAdd.dispose(),this._onDidRemove.dispose();for(const group of this.groups)group.dispose();this.gridview.dispose(),super.dispose()}}class SplitviewApi{get minimumSize(){return this.component.minimumSize}get maximumSize(){return this.component.maximumSize}get width(){return this.component.width}get height(){return this.component.height}get length(){return this.component.length}get orientation(){return this.component.orientation}get panels(){return this.component.panels}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidAddView(){return this.component.onDidAddView}get onDidRemoveView(){return this.component.onDidRemoveView}constructor(component){this.component=component}removePanel(panel2,sizing){this.component.removePanel(panel2,sizing)}focus(){this.component.focus()}getPanel(id){return this.component.getPanel(id)}layout(width,height){return this.component.layout(width,height)}addPanel(options){return this.component.addPanel(options)}movePanel(from,to){this.component.movePanel(from,to)}fromJSON(data){this.component.fromJSON(data)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(options){this.component.updateOptions(options)}dispose(){this.component.dispose()}}class PaneviewApi{get minimumSize(){return this.component.minimumSize}get maximumSize(){return this.component.maximumSize}get width(){return this.component.width}get height(){return this.component.height}get panels(){return this.component.panels}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidAddView(){return this.component.onDidAddView}get onDidRemoveView(){return this.component.onDidRemoveView}get onDidDrop(){return this.component.onDidDrop}get onUnhandledDragOverEvent(){return this.component.onUnhandledDragOverEvent}constructor(component){this.component=component}removePanel(panel2){this.component.removePanel(panel2)}getPanel(id){return this.component.getPanel(id)}movePanel(from,to){this.component.movePanel(from,to)}focus(){this.component.focus()}layout(width,height){this.component.layout(width,height)}addPanel(options){return this.component.addPanel(options)}fromJSON(data){this.component.fromJSON(data)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(options){this.component.updateOptions(options)}dispose(){this.component.dispose()}}class GridviewApi{get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidAddPanel(){return this.component.onDidAddGroup}get onDidRemovePanel(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActiveGroupChange}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get panels(){return this.component.groups}get orientation(){return this.component.orientation}set orientation(value2){this.component.updateOptions({orientation:value2})}constructor(component){this.component=component}focus(){this.component.focus()}layout(width,height,force=!1){this.component.layout(width,height,force)}addPanel(options){return this.component.addPanel(options)}removePanel(panel2,sizing){this.component.removePanel(panel2,sizing)}movePanel(panel2,options){this.component.movePanel(panel2,options)}getPanel(id){return this.component.getPanel(id)}fromJSON(data){return this.component.fromJSON(data)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}updateOptions(options){this.component.updateOptions(options)}dispose(){this.component.dispose()}}class DockviewApi{get id(){return this.component.id}get width(){return this.component.width}get height(){return this.component.height}get minimumHeight(){return this.component.minimumHeight}get maximumHeight(){return this.component.maximumHeight}get minimumWidth(){return this.component.minimumWidth}get maximumWidth(){return this.component.maximumWidth}get size(){return this.component.size}get totalPanels(){return this.component.totalPanels}get onDidActiveGroupChange(){return this.component.onDidActiveGroupChange}get onDidAddGroup(){return this.component.onDidAddGroup}get onDidRemoveGroup(){return this.component.onDidRemoveGroup}get onDidActivePanelChange(){return this.component.onDidActivePanelChange}get onDidAddPanel(){return this.component.onDidAddPanel}get onDidRemovePanel(){return this.component.onDidRemovePanel}get onDidMovePanel(){return this.component.onDidMovePanel}get onDidLayoutFromJSON(){return this.component.onDidLayoutFromJSON}get onDidLayoutChange(){return this.component.onDidLayoutChange}get onDidDrop(){return this.component.onDidDrop}get onWillDrop(){return this.component.onWillDrop}get onWillShowOverlay(){return this.component.onWillShowOverlay}get onWillDragGroup(){return this.component.onWillDragGroup}get onWillDragPanel(){return this.component.onWillDragPanel}get onUnhandledDragOverEvent(){return this.component.onUnhandledDragOverEvent}get onDidPopoutGroupSizeChange(){return this.component.onDidPopoutGroupSizeChange}get onDidPopoutGroupPositionChange(){return this.component.onDidPopoutGroupPositionChange}get onDidOpenPopoutWindowFail(){return this.component.onDidOpenPopoutWindowFail}get panels(){return this.component.panels}get groups(){return this.component.groups}get activePanel(){return this.component.activePanel}get activeGroup(){return this.component.activeGroup}constructor(component){this.component=component}focus(){this.component.focus()}getPanel(id){return this.component.getGroupPanel(id)}layout(width,height,force=!1){this.component.layout(width,height,force)}addPanel(options){return this.component.addPanel(options)}removePanel(panel2){this.component.removePanel(panel2)}addGroup(options){return this.component.addGroup(options)}closeAllGroups(){return this.component.closeAllGroups()}removeGroup(group){this.component.removeGroup(group)}getGroup(id){return this.component.getPanel(id)}addFloatingGroup(item,options){return this.component.addFloatingGroup(item,options)}fromJSON(data,options){this.component.fromJSON(data,options)}toJSON(){return this.component.toJSON()}clear(){this.component.clear()}moveToNext(options){this.component.moveToNext(options)}moveToPrevious(options){this.component.moveToPrevious(options)}maximizeGroup(panel2){this.component.maximizeGroup(panel2.group)}hasMaximizedGroup(){return this.component.hasMaximizedGroup()}exitMaximizedGroup(){this.component.exitMaximizedGroup()}get onDidMaximizedGroupChange(){return this.component.onDidMaximizedGroupChange}addPopoutGroup(item,options){return this.component.addPopoutGroup(item,options)}updateOptions(options){this.component.updateOptions(options)}dispose(){this.component.dispose()}}class DragHandler extends CompositeDisposable{constructor(el,disabled){super(),this.el=el,this.disabled=disabled,this.dataDisposable=new MutableDisposable,this.pointerEventsDisposable=new MutableDisposable,this._onDragStart=new Emitter,this.onDragStart=this._onDragStart.event,this.addDisposables(this._onDragStart,this.dataDisposable,this.pointerEventsDisposable),this.configure()}setDisabled(disabled){this.disabled=disabled}isCancelled(_event){return!1}configure(){this.addDisposables(this._onDragStart,addDisposableListener(this.el,"dragstart",event=>{if(event.defaultPrevented||this.isCancelled(event)||this.disabled){event.preventDefault();return}const iframes=disableIframePointEvents();this.pointerEventsDisposable.value={dispose:()=>{iframes.release()}},this.el.classList.add("dv-dragged"),setTimeout(()=>this.el.classList.remove("dv-dragged"),0),this.dataDisposable.value=this.getData(event),this._onDragStart.fire(event),event.dataTransfer&&(event.dataTransfer.effectAllowed="move",event.dataTransfer.items.length>0||event.dataTransfer.setData("text/plain",""))}),addDisposableListener(this.el,"dragend",()=>{this.pointerEventsDisposable.dispose(),setTimeout(()=>{this.dataDisposable.dispose()},0)}))}}class DragAndDropObserver extends CompositeDisposable{constructor(element,callbacks){super(),this.element=element,this.callbacks=callbacks,this.target=null,this.registerListeners()}onDragEnter(e){this.target=e.target,this.callbacks.onDragEnter(e)}onDragOver(e){e.preventDefault(),this.callbacks.onDragOver&&this.callbacks.onDragOver(e)}onDragLeave(e){this.target===e.target&&(this.target=null,this.callbacks.onDragLeave(e))}onDragEnd(e){this.target=null,this.callbacks.onDragEnd(e)}onDrop(e){this.callbacks.onDrop(e)}registerListeners(){this.addDisposables(addDisposableListener(this.element,"dragenter",e=>{this.onDragEnter(e)},!0)),this.addDisposables(addDisposableListener(this.element,"dragover",e=>{this.onDragOver(e)},!0)),this.addDisposables(addDisposableListener(this.element,"dragleave",e=>{this.onDragLeave(e)})),this.addDisposables(addDisposableListener(this.element,"dragend",e=>{this.onDragEnd(e)})),this.addDisposables(addDisposableListener(this.element,"drop",e=>{this.onDrop(e)}))}}function setGPUOptimizedBounds(element,bounds){const{top,left,width,height}=bounds,topPx=`${Math.round(top)}px`,leftPx=`${Math.round(left)}px`,widthPx=`${Math.round(width)}px`,heightPx=`${Math.round(height)}px`;element.style.top=topPx,element.style.left=leftPx,element.style.width=widthPx,element.style.height=heightPx,element.style.visibility="visible",(!element.style.transform||element.style.transform==="")&&(element.style.transform="translate3d(0, 0, 0)")}function setGPUOptimizedBoundsFromStrings(element,bounds){const{top,left,width,height}=bounds;element.style.top=top,element.style.left=left,element.style.width=width,element.style.height=height,element.style.visibility="visible",(!element.style.transform||element.style.transform==="")&&(element.style.transform="translate3d(0, 0, 0)")}function checkBoundsChanged(element,bounds){const{top,left,width,height}=bounds,topPx=`${Math.round(top)}px`,leftPx=`${Math.round(left)}px`,widthPx=`${Math.round(width)}px`,heightPx=`${Math.round(height)}px`;return element.style.top!==topPx||element.style.left!==leftPx||element.style.width!==widthPx||element.style.height!==heightPx}class WillShowOverlayEvent extends DockviewEvent{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}constructor(options){super(),this.options=options}}function directionToPosition(direction){switch(direction){case"above":return"top";case"below":return"bottom";case"left":return"left";case"right":return"right";case"within":return"center";default:throw new Error(`invalid direction '${direction}'`)}}function positionToDirection(position){switch(position){case"top":return"above";case"bottom":return"below";case"left":return"left";case"right":return"right";case"center":return"within";default:throw new Error(`invalid position '${position}'`)}}const DEFAULT_ACTIVATION_SIZE={value:20,type:"percentage"},DEFAULT_SIZE$1={value:50,type:"percentage"},SMALL_WIDTH_BOUNDARY=100,SMALL_HEIGHT_BOUNDARY=100;class Droptarget extends CompositeDisposable{get disabled(){return this._disabled}set disabled(value2){this._disabled=value2}get state(){return this._state}constructor(element,options){super(),this.element=element,this.options=options,this._onDrop=new Emitter,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new Emitter,this.onWillShowOverlay=this._onWillShowOverlay.event,this._disabled=!1,this._acceptedTargetZonesSet=new Set(this.options.acceptedTargetZones),this.dnd=new DragAndDropObserver(this.element,{onDragEnter:()=>{var _a,_b,_c;(_c=(_b=(_a=this.options).getOverrideTarget)===null||_b===void 0?void 0:_b.call(_a))===null||_c===void 0||_c.getElements()},onDragOver:e=>{var _a,_b,_c,_d,_e,_f,_g;Droptarget.ACTUAL_TARGET=this;const overrideTarget=(_b=(_a=this.options).getOverrideTarget)===null||_b===void 0?void 0:_b.call(_a);if(this._acceptedTargetZonesSet.size===0){if(overrideTarget)return;this.removeDropTarget();return}const target=(_e=(_d=(_c=this.options).getOverlayOutline)===null||_d===void 0?void 0:_d.call(_c))!==null&&_e!==void 0?_e:this.element,width=target.offsetWidth,height=target.offsetHeight;if(width===0||height===0)return;const rect=e.currentTarget.getBoundingClientRect(),x=((_f=e.clientX)!==null&&_f!==void 0?_f:0)-rect.left,y=((_g=e.clientY)!==null&&_g!==void 0?_g:0)-rect.top,quadrant=this.calculateQuadrant(this._acceptedTargetZonesSet,x,y,width,height);if(this.isAlreadyUsed(e)||quadrant===null){this.removeDropTarget();return}if(!this.options.canDisplayOverlay(e,quadrant)){if(overrideTarget)return;this.removeDropTarget();return}const willShowOverlayEvent=new WillShowOverlayEvent({nativeEvent:e,position:quadrant});if(this._onWillShowOverlay.fire(willShowOverlayEvent),willShowOverlayEvent.defaultPrevented){this.removeDropTarget();return}this.markAsUsed(e),overrideTarget||this.targetElement||(this.targetElement=document.createElement("div"),this.targetElement.className="dv-drop-target-dropzone",this.overlayElement=document.createElement("div"),this.overlayElement.className="dv-drop-target-selection",this._state="center",this.targetElement.appendChild(this.overlayElement),target.classList.add("dv-drop-target"),target.append(this.targetElement)),this.toggleClasses(quadrant,width,height),this._state=quadrant},onDragLeave:()=>{var _a,_b;!((_b=(_a=this.options).getOverrideTarget)===null||_b===void 0)&&_b.call(_a)||this.removeDropTarget()},onDragEnd:e=>{var _a,_b;const target=(_b=(_a=this.options).getOverrideTarget)===null||_b===void 0?void 0:_b.call(_a);target&&Droptarget.ACTUAL_TARGET===this&&this._state&&(e.stopPropagation(),this._onDrop.fire({position:this._state,nativeEvent:e})),this.removeDropTarget(),target?.clear()},onDrop:e=>{var _a,_b,_c;e.preventDefault();const state=this._state;this.removeDropTarget(),(_c=(_b=(_a=this.options).getOverrideTarget)===null||_b===void 0?void 0:_b.call(_a))===null||_c===void 0||_c.clear(),state&&(e.stopPropagation(),this._onDrop.fire({position:state,nativeEvent:e}))}}),this.addDisposables(this._onDrop,this._onWillShowOverlay,this.dnd)}setTargetZones(acceptedTargetZones){this._acceptedTargetZonesSet=new Set(acceptedTargetZones)}setOverlayModel(model){this.options.overlayModel=model}dispose(){this.removeDropTarget(),super.dispose()}markAsUsed(event){event[Droptarget.USED_EVENT_ID]=!0}isAlreadyUsed(event){const value2=event[Droptarget.USED_EVENT_ID];return typeof value2=="boolean"&&value2}toggleClasses(quadrant,width,height){var _a,_b,_c,_d,_e,_f,_g;const target=(_b=(_a=this.options).getOverrideTarget)===null||_b===void 0?void 0:_b.call(_a);if(!target&&!this.overlayElement)return;const isSmallX=width<SMALL_WIDTH_BOUNDARY,isSmallY=height<SMALL_HEIGHT_BOUNDARY,isLeft=quadrant==="left",isRight=quadrant==="right",isTop=quadrant==="top",isBottom=quadrant==="bottom",rightClass=!isSmallX&&isRight,leftClass=!isSmallX&&isLeft,topClass=!isSmallY&&isTop,bottomClass=!isSmallY&&isBottom;let size=1;const sizeOptions=(_d=(_c=this.options.overlayModel)===null||_c===void 0?void 0:_c.size)!==null&&_d!==void 0?_d:DEFAULT_SIZE$1;if(sizeOptions.type==="percentage"?size=clamp(sizeOptions.value,0,100)/100:((rightClass||leftClass)&&(size=clamp(0,sizeOptions.value,width)/width),(topClass||bottomClass)&&(size=clamp(0,sizeOptions.value,height)/height)),target){const outlineEl=(_g=(_f=(_e=this.options).getOverlayOutline)===null||_f===void 0?void 0:_f.call(_e))!==null&&_g!==void 0?_g:this.element,elBox=outlineEl.getBoundingClientRect(),ta=target.getElements(void 0,outlineEl),el=ta.root,overlay=ta.overlay,bigbox=el.getBoundingClientRect(),rootTop=elBox.top-bigbox.top,rootLeft=elBox.left-bigbox.left,box2={top:rootTop,left:rootLeft,width,height};if(rightClass?(box2.left=rootLeft+width*(1-size),box2.width=width*size):leftClass?box2.width=width*size:topClass?box2.height=height*size:bottomClass&&(box2.top=rootTop+height*(1-size),box2.height=height*size),isSmallX&&isLeft&&(box2.width=4),isSmallX&&isRight&&(box2.left=rootLeft+width-4,box2.width=4),!checkBoundsChanged(overlay,box2))return;setGPUOptimizedBounds(overlay,box2),overlay.className=`dv-drop-target-anchor${this.options.className?` ${this.options.className}`:""}`,toggleClass(overlay,"dv-drop-target-left",isLeft),toggleClass(overlay,"dv-drop-target-right",isRight),toggleClass(overlay,"dv-drop-target-top",isTop),toggleClass(overlay,"dv-drop-target-bottom",isBottom),toggleClass(overlay,"dv-drop-target-center",quadrant==="center"),ta.changed&&(toggleClass(overlay,"dv-drop-target-anchor-container-changed",!0),setTimeout(()=>{toggleClass(overlay,"dv-drop-target-anchor-container-changed",!1)},10));return}if(!this.overlayElement)return;const box={top:"0px",left:"0px",width:"100%",height:"100%"};rightClass?(box.left=`${100*(1-size)}%`,box.width=`${100*size}%`):leftClass?box.width=`${100*size}%`:topClass?box.height=`${100*size}%`:bottomClass&&(box.top=`${100*(1-size)}%`,box.height=`${100*size}%`),setGPUOptimizedBoundsFromStrings(this.overlayElement,box),toggleClass(this.overlayElement,"dv-drop-target-small-vertical",isSmallY),toggleClass(this.overlayElement,"dv-drop-target-small-horizontal",isSmallX),toggleClass(this.overlayElement,"dv-drop-target-left",isLeft),toggleClass(this.overlayElement,"dv-drop-target-right",isRight),toggleClass(this.overlayElement,"dv-drop-target-top",isTop),toggleClass(this.overlayElement,"dv-drop-target-bottom",isBottom),toggleClass(this.overlayElement,"dv-drop-target-center",quadrant==="center")}calculateQuadrant(overlayType,x,y,width,height){var _a,_b;const activationSizeOptions=(_b=(_a=this.options.overlayModel)===null||_a===void 0?void 0:_a.activationSize)!==null&&_b!==void 0?_b:DEFAULT_ACTIVATION_SIZE;return activationSizeOptions.type==="percentage"?calculateQuadrantAsPercentage(overlayType,x,y,width,height,activationSizeOptions.value):calculateQuadrantAsPixels(overlayType,x,y,width,height,activationSizeOptions.value)}removeDropTarget(){var _a;this.targetElement&&(this._state=void 0,(_a=this.targetElement.parentElement)===null||_a===void 0||_a.classList.remove("dv-drop-target"),this.targetElement.remove(),this.targetElement=void 0,this.overlayElement=void 0)}}Droptarget.USED_EVENT_ID="__dockview_droptarget_event_is_used__";function calculateQuadrantAsPercentage(overlayType,x,y,width,height,threshold){const xp=100*x/width,yp=100*y/height;return overlayType.has("left")&&xp<threshold?"left":overlayType.has("right")&&xp>100-threshold?"right":overlayType.has("top")&&yp<threshold?"top":overlayType.has("bottom")&&yp>100-threshold?"bottom":overlayType.has("center")?"center":null}function calculateQuadrantAsPixels(overlayType,x,y,width,height,threshold){return overlayType.has("left")&&x<threshold?"left":overlayType.has("right")&&x>width-threshold?"right":overlayType.has("top")&&y<threshold?"top":overlayType.has("bottom")&&y>height-threshold?"bottom":overlayType.has("center")?"center":null}const PROPERTY_KEYS_PANEVIEW=Object.keys({disableAutoResizing:void 0,disableDnd:void 0,className:void 0});class PaneviewUnhandledDragOverEvent extends AcceptableEvent{constructor(nativeEvent,position,getData,panel2){super(),this.nativeEvent=nativeEvent,this.position=position,this.getData=getData,this.panel=panel2}}class WillFocusEvent extends DockviewEvent{constructor(){super()}}class PanelApiImpl extends CompositeDisposable{get isFocused(){return this._isFocused}get isActive(){return this._isActive}get isVisible(){return this._isVisible}get width(){return this._width}get height(){return this._height}constructor(id,component){super(),this.id=id,this.component=component,this._isFocused=!1,this._isActive=!1,this._isVisible=!0,this._width=0,this._height=0,this._parameters={},this.panelUpdatesDisposable=new MutableDisposable,this._onDidDimensionChange=new Emitter,this.onDidDimensionsChange=this._onDidDimensionChange.event,this._onDidChangeFocus=new Emitter,this.onDidFocusChange=this._onDidChangeFocus.event,this._onWillFocus=new Emitter,this.onWillFocus=this._onWillFocus.event,this._onDidVisibilityChange=new Emitter,this.onDidVisibilityChange=this._onDidVisibilityChange.event,this._onWillVisibilityChange=new Emitter,this.onWillVisibilityChange=this._onWillVisibilityChange.event,this._onDidActiveChange=new Emitter,this.onDidActiveChange=this._onDidActiveChange.event,this._onActiveChange=new Emitter,this.onActiveChange=this._onActiveChange.event,this._onDidParametersChange=new Emitter,this.onDidParametersChange=this._onDidParametersChange.event,this.addDisposables(this.onDidFocusChange(event=>{this._isFocused=event.isFocused}),this.onDidActiveChange(event=>{this._isActive=event.isActive}),this.onDidVisibilityChange(event=>{this._isVisible=event.isVisible}),this.onDidDimensionsChange(event=>{this._width=event.width,this._height=event.height}),this.panelUpdatesDisposable,this._onDidDimensionChange,this._onDidChangeFocus,this._onDidVisibilityChange,this._onDidActiveChange,this._onWillFocus,this._onActiveChange,this._onWillFocus,this._onWillVisibilityChange,this._onDidParametersChange)}getParameters(){return this._parameters}initialize(panel2){this.panelUpdatesDisposable.value=this._onDidParametersChange.event(parameters=>{this._parameters=parameters,panel2.update({params:parameters})})}setVisible(isVisible){this._onWillVisibilityChange.fire({isVisible})}setActive(){this._onActiveChange.fire()}updateParameters(parameters){this._onDidParametersChange.fire(parameters)}}class SplitviewPanelApiImpl extends PanelApiImpl{constructor(id,component){super(id,component),this._onDidConstraintsChangeInternal=new Emitter,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new Emitter({replay:!0}),this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new Emitter,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange)}setConstraints(value2){this._onDidConstraintsChangeInternal.fire(value2)}setSize(event){this._onDidSizeChange.fire(event)}}class PaneviewPanelApiImpl extends SplitviewPanelApiImpl{set pane(pane){this._pane=pane}constructor(id,component){super(id,component),this._onDidExpansionChange=new Emitter({replay:!0}),this.onDidExpansionChange=this._onDidExpansionChange.event,this._onMouseEnter=new Emitter({}),this.onMouseEnter=this._onMouseEnter.event,this._onMouseLeave=new Emitter({}),this.onMouseLeave=this._onMouseLeave.event,this.addDisposables(this._onDidExpansionChange,this._onMouseEnter,this._onMouseLeave)}setExpanded(isExpanded){var _a;(_a=this._pane)===null||_a===void 0||_a.setExpanded(isExpanded)}get isExpanded(){var _a;return!!(!((_a=this._pane)===null||_a===void 0)&&_a.isExpanded())}}class BasePanelView extends CompositeDisposable{get element(){return this._element}get width(){return this._width}get height(){return this._height}get params(){var _a;return(_a=this._params)===null||_a===void 0?void 0:_a.params}constructor(id,component,api){super(),this.id=id,this.component=component,this.api=api,this._height=0,this._width=0,this._element=document.createElement("div"),this._element.tabIndex=-1,this._element.style.outline="none",this._element.style.height="100%",this._element.style.width="100%",this._element.style.overflow="hidden";const focusTracker=trackFocus(this._element);this.addDisposables(this.api,focusTracker.onDidFocus(()=>{this.api._onDidChangeFocus.fire({isFocused:!0})}),focusTracker.onDidBlur(()=>{this.api._onDidChangeFocus.fire({isFocused:!1})}),focusTracker)}focus(){const event=new WillFocusEvent;this.api._onWillFocus.fire(event),!event.defaultPrevented&&this._element.focus()}layout(width,height){this._width=width,this._height=height,this.api._onDidDimensionChange.fire({width,height}),this.part&&this._params&&this.part.update(this._params.params)}init(parameters){this._params=parameters,this.part=this.getComponent()}update(event){var _a,_b;this._params=Object.assign(Object.assign({},this._params),{params:Object.assign(Object.assign({},(_a=this._params)===null||_a===void 0?void 0:_a.params),event.params)});for(const key of Object.keys(event.params))event.params[key]===void 0&&delete this._params.params[key];(_b=this.part)===null||_b===void 0||_b.update({params:this._params.params})}toJSON(){var _a,_b;const params=(_b=(_a=this._params)===null||_a===void 0?void 0:_a.params)!==null&&_b!==void 0?_b:{};return{id:this.id,component:this.component,params:Object.keys(params).length>0?params:void 0}}dispose(){var _a;this.api.dispose(),(_a=this.part)===null||_a===void 0||_a.dispose(),super.dispose()}}class PaneviewPanel extends BasePanelView{set orientation(value2){this._orientation=value2}get orientation(){return this._orientation}get minimumSize(){const headerSize=this.headerSize,minimumBodySize=this.isExpanded()?this._minimumBodySize:0;return headerSize+minimumBodySize}get maximumSize(){const headerSize=this.headerSize,maximumBodySize=this.isExpanded()?this._maximumBodySize:0;return headerSize+maximumBodySize}get size(){return this._size}get orthogonalSize(){return this._orthogonalSize}set orthogonalSize(size){this._orthogonalSize=size}get minimumBodySize(){return this._minimumBodySize}set minimumBodySize(value2){this._minimumBodySize=typeof value2=="number"?value2:0}get maximumBodySize(){return this._maximumBodySize}set maximumBodySize(value2){this._maximumBodySize=typeof value2=="number"?value2:Number.POSITIVE_INFINITY}get headerVisible(){return this._headerVisible}set headerVisible(value2){this._headerVisible=value2,this.header.style.display=value2?"":"none"}constructor(options){super(options.id,options.component,new PaneviewPanelApiImpl(options.id,options.component)),this._onDidChangeExpansionState=new Emitter({replay:!0}),this.onDidChangeExpansionState=this._onDidChangeExpansionState.event,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._orthogonalSize=0,this._size=0,this._isExpanded=!1,this.api.pane=this,this.api.initialize(this),this.headerSize=options.headerSize,this.headerComponent=options.headerComponent,this._minimumBodySize=options.minimumBodySize,this._maximumBodySize=options.maximumBodySize,this._isExpanded=options.isExpanded,this._headerVisible=options.isHeaderVisible,this._onDidChangeExpansionState.fire(this.isExpanded()),this._orientation=options.orientation,this.element.classList.add("dv-pane"),this.addDisposables(this.api.onWillVisibilityChange(event=>{const{isVisible}=event,{accessor}=this._params;accessor.setVisible(this,isVisible)}),this.api.onDidSizeChange(event=>{this._onDidChange.fire({size:event.size})}),addDisposableListener(this.element,"mouseenter",ev=>{this.api._onMouseEnter.fire(ev)}),addDisposableListener(this.element,"mouseleave",ev=>{this.api._onMouseLeave.fire(ev)})),this.addDisposables(this._onDidChangeExpansionState,this.onDidChangeExpansionState(isPanelExpanded=>{this.api._onDidExpansionChange.fire({isExpanded:isPanelExpanded})}),this.api.onDidFocusChange(e=>{this.header&&(e.isFocused?addClasses(this.header,"focused"):removeClasses(this.header,"focused"))})),this.renderOnce()}setVisible(isVisible){this.api._onDidVisibilityChange.fire({isVisible})}setActive(isActive){this.api._onDidActiveChange.fire({isActive})}isExpanded(){return this._isExpanded}setExpanded(expanded){this._isExpanded!==expanded&&(this._isExpanded=expanded,expanded?(this.animationTimer&&clearTimeout(this.animationTimer),this.body&&this.element.appendChild(this.body)):this.animationTimer=setTimeout(()=>{var _a;(_a=this.body)===null||_a===void 0||_a.remove()},200),this._onDidChange.fire(expanded?{size:this.width}:{}),this._onDidChangeExpansionState.fire(expanded))}layout(size,orthogonalSize){this._size=size,this._orthogonalSize=orthogonalSize;const[width,height]=this.orientation===Orientation.HORIZONTAL?[size,orthogonalSize]:[orthogonalSize,size];super.layout(width,height)}init(parameters){var _a,_b;super.init(parameters),typeof parameters.minimumBodySize=="number"&&(this.minimumBodySize=parameters.minimumBodySize),typeof parameters.maximumBodySize=="number"&&(this.maximumBodySize=parameters.maximumBodySize),this.bodyPart=this.getBodyComponent(),this.headerPart=this.getHeaderComponent(),this.bodyPart.init(Object.assign(Object.assign({},parameters),{api:this.api})),this.headerPart.init(Object.assign(Object.assign({},parameters),{api:this.api})),(_a=this.body)===null||_a===void 0||_a.append(this.bodyPart.element),(_b=this.header)===null||_b===void 0||_b.append(this.headerPart.element),typeof parameters.isExpanded=="boolean"&&this.setExpanded(parameters.isExpanded)}toJSON(){const params=this._params;return Object.assign(Object.assign({},super.toJSON()),{headerComponent:this.headerComponent,title:params.title})}renderOnce(){this.header=document.createElement("div"),this.header.tabIndex=0,this.header.className="dv-pane-header",this.header.style.height=`${this.headerSize}px`,this.header.style.lineHeight=`${this.headerSize}px`,this.header.style.minHeight=`${this.headerSize}px`,this.header.style.maxHeight=`${this.headerSize}px`,this.element.appendChild(this.header),this.body=document.createElement("div"),this.body.className="dv-pane-body",this.element.appendChild(this.body)}getComponent(){return{update:params=>{var _a,_b;(_a=this.bodyPart)===null||_a===void 0||_a.update({params}),(_b=this.headerPart)===null||_b===void 0||_b.update({params})},dispose:()=>{var _a,_b;(_a=this.bodyPart)===null||_a===void 0||_a.dispose(),(_b=this.headerPart)===null||_b===void 0||_b.dispose()}}}}class DraggablePaneviewPanel extends PaneviewPanel{constructor(options){super({id:options.id,component:options.component,headerComponent:options.headerComponent,orientation:options.orientation,isExpanded:options.isExpanded,isHeaderVisible:!0,headerSize:options.headerSize,minimumBodySize:options.minimumBodySize,maximumBodySize:options.maximumBodySize}),this._onDidDrop=new Emitter,this.onDidDrop=this._onDidDrop.event,this._onUnhandledDragOverEvent=new Emitter,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,this.accessor=options.accessor,this.addDisposables(this._onDidDrop,this._onUnhandledDragOverEvent),options.disableDnd||this.initDragFeatures()}initDragFeatures(){if(!this.header)return;const id=this.id,accessorId=this.accessor.id;this.header.draggable=!0,this.handler=new class extends DragHandler{getData(){return LocalSelectionTransfer.getInstance().setData([new PaneTransfer(accessorId,id)],PaneTransfer.prototype),{dispose:()=>{LocalSelectionTransfer.getInstance().clearData(PaneTransfer.prototype)}}}}(this.header),this.target=new Droptarget(this.element,{acceptedTargetZones:["top","bottom"],overlayModel:{activationSize:{type:"percentage",value:50}},canDisplayOverlay:(event,position)=>{const data=getPaneData();if(data&&data.paneId!==this.id&&data.viewId===this.accessor.id)return!0;const firedEvent=new PaneviewUnhandledDragOverEvent(event,position,getPaneData,this);return this._onUnhandledDragOverEvent.fire(firedEvent),firedEvent.isAccepted}}),this.addDisposables(this._onDidDrop,this.handler,this.target,this.target.onDrop(event=>{this.onDrop(event)}))}onDrop(event){const data=getPaneData();if(!data||data.viewId!==this.accessor.id){this._onDidDrop.fire(Object.assign(Object.assign({},event),{panel:this,api:new PaneviewApi(this.accessor),getData:getPaneData}));return}const containerApi=this._params.containerApi,panelId=data.paneId,existingPanel=containerApi.getPanel(panelId);if(!existingPanel){this._onDidDrop.fire(Object.assign(Object.assign({},event),{panel:this,getData:getPaneData,api:new PaneviewApi(this.accessor)}));return}const allPanels=containerApi.panels,fromIndex=allPanels.indexOf(existingPanel);let toIndex=containerApi.panels.indexOf(this);(event.position==="left"||event.position==="top")&&(toIndex=Math.max(0,toIndex-1)),(event.position==="right"||event.position==="bottom")&&(fromIndex>toIndex&&toIndex++,toIndex=Math.min(allPanels.length-1,toIndex)),containerApi.movePanel(fromIndex,toIndex)}}class ContentContainer extends CompositeDisposable{get element(){return this._element}constructor(accessor,group){super(),this.accessor=accessor,this.group=group,this.disposable=new MutableDisposable,this._onDidFocus=new Emitter,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new Emitter,this.onDidBlur=this._onDidBlur.event,this._element=document.createElement("div"),this._element.className="dv-content-container",this._element.tabIndex=-1,this.addDisposables(this._onDidFocus,this._onDidBlur);const target=group.dropTargetContainer;this.dropTarget=new Droptarget(this.element,{getOverlayOutline:()=>{var _a;return((_a=accessor.options.theme)===null||_a===void 0?void 0:_a.dndPanelOverlay)==="group"?this.element.parentElement:null},className:"dv-drop-target-content",acceptedTargetZones:["top","bottom","left","right","center"],canDisplayOverlay:(event,position)=>{if(this.group.locked==="no-drop-target"||this.group.locked&&position==="center")return!1;const data=getPanelData();return!data&&event.shiftKey&&this.group.location.type!=="floating"?!1:data&&data.viewId===this.accessor.id?!0:this.group.canDisplayOverlay(event,position,"content")},getOverrideTarget:target?()=>target.model:void 0}),this.addDisposables(this.dropTarget)}show(){this.element.style.display=""}hide(){this.element.style.display="none"}renderPanel(panel2,options={asActive:!0}){const doRender=options.asActive||this.panel&&this.group.isPanelActive(this.panel);this.panel&&this.panel.view.content.element.parentElement===this._element&&this._element.removeChild(this.panel.view.content.element),this.panel=panel2;let container2;switch(panel2.api.renderer){case"onlyWhenVisible":this.group.renderContainer.detatch(panel2),this.panel&&doRender&&this._element.appendChild(this.panel.view.content.element),container2=this._element;break;case"always":panel2.view.content.element.parentElement===this._element&&this._element.removeChild(panel2.view.content.element),container2=this.group.renderContainer.attach({panel:panel2,referenceContainer:this});break;default:throw new Error(`dockview: invalid renderer type '${panel2.api.renderer}'`)}if(doRender){const focusTracker=trackFocus(container2);this.focusTracker=focusTracker;const disposable=new CompositeDisposable;disposable.addDisposables(focusTracker,focusTracker.onDidFocus(()=>this._onDidFocus.fire()),focusTracker.onDidBlur(()=>this._onDidBlur.fire())),this.disposable.value=disposable}}openPanel(panel2){this.panel!==panel2&&this.renderPanel(panel2)}layout(_width,_height){}closePanel(){var _a;this.panel&&this.panel.api.renderer==="onlyWhenVisible"&&((_a=this.panel.view.content.element.parentElement)===null||_a===void 0||_a.removeChild(this.panel.view.content.element)),this.panel=void 0}dispose(){this.disposable.dispose(),super.dispose()}refreshFocusState(){var _a;!((_a=this.focusTracker)===null||_a===void 0)&&_a.refreshState&&this.focusTracker.refreshState()}}function addGhostImage(dataTransfer,ghostElement,options){var _a,_b;addClasses(ghostElement,"dv-dragged"),ghostElement.style.top="-9999px",document.body.appendChild(ghostElement),dataTransfer.setDragImage(ghostElement,(_a=options?.x)!==null&&_a!==void 0?_a:0,(_b=options?.y)!==null&&_b!==void 0?_b:0),setTimeout(()=>{removeClasses(ghostElement,"dv-dragged"),ghostElement.remove()},0)}class TabDragHandler extends DragHandler{constructor(element,accessor,group,panel2,disabled){super(element,disabled),this.accessor=accessor,this.group=group,this.panel=panel2,this.panelTransfer=LocalSelectionTransfer.getInstance()}getData(event){return this.panelTransfer.setData([new PanelTransfer(this.accessor.id,this.group.id,this.panel.id)],PanelTransfer.prototype),{dispose:()=>{this.panelTransfer.clearData(PanelTransfer.prototype)}}}}class Tab extends CompositeDisposable{get element(){return this._element}constructor(panel2,accessor,group){super(),this.panel=panel2,this.accessor=accessor,this.group=group,this.content=void 0,this._onPointDown=new Emitter,this.onPointerDown=this._onPointDown.event,this._onDropped=new Emitter,this.onDrop=this._onDropped.event,this._onDragStart=new Emitter,this.onDragStart=this._onDragStart.event,this._onDragEnd=new Emitter,this.onDragEnd=this._onDragEnd.event,this._element=document.createElement("div"),this._element.className="dv-tab",this._element.tabIndex=0,this._element.draggable=!this.accessor.options.disableDnd,toggleClass(this.element,"dv-inactive-tab",!0),this.dragHandler=new TabDragHandler(this._element,this.accessor,this.group,this.panel,!!this.accessor.options.disableDnd),this.dropTarget=new Droptarget(this._element,{acceptedTargetZones:["left","right"],overlayModel:{activationSize:{value:50,type:"percentage"}},canDisplayOverlay:(event,position)=>{if(this.group.locked)return!1;const data=getPanelData();return data&&this.accessor.id===data.viewId?!(this.accessor.options.tabAnimation==="smooth"&&data.groupId===this.group.id):this.group.model.canDisplayOverlay(event,position,"tab")},getOverrideTarget:()=>{var _a;return(_a=group.model.dropTargetContainer)===null||_a===void 0?void 0:_a.model}}),this.onWillShowOverlay=this.dropTarget.onWillShowOverlay,this.addDisposables(this._onPointDown,this._onDropped,this._onDragStart,this._onDragEnd,this.dragHandler.onDragStart(event=>{if(event.dataTransfer){const style=getComputedStyle(this.element),newNode=this.element.cloneNode(!0);Array.from(style).forEach(key=>newNode.style.setProperty(key,style.getPropertyValue(key),style.getPropertyPriority(key))),newNode.style.position="absolute",addGhostImage(event.dataTransfer,newNode,{y:-10,x:30})}this._onDragStart.fire(event),this.accessor.options.tabAnimation==="smooth"&&requestAnimationFrame(()=>{toggleClass(this.element,"dv-tab--dragging",!0)})}),addDisposableListener(this._element,"dragend",event=>{toggleClass(this.element,"dv-tab--dragging",!1),this._onDragEnd.fire(event)}),this.dragHandler,addDisposableListener(this._element,"pointerdown",event=>{this._onPointDown.fire(event)}),this.dropTarget.onDrop(event=>{this._onDropped.fire(event)}),this.dropTarget)}setActive(isActive){toggleClass(this.element,"dv-active-tab",isActive),toggleClass(this.element,"dv-inactive-tab",!isActive)}setContent(part){this.content&&this._element.removeChild(this.content.element),this.content=part,this._element.appendChild(this.content.element)}updateDragAndDropState(){this._element.draggable=!this.accessor.options.disableDnd,this.dragHandler.setDisabled(!!this.accessor.options.disableDnd)}dispose(){super.dispose()}}class DockviewWillShowOverlayLocationEvent{get kind(){return this.options.kind}get nativeEvent(){return this.event.nativeEvent}get position(){return this.event.position}get defaultPrevented(){return this.event.defaultPrevented}get panel(){return this.options.panel}get api(){return this.options.api}get group(){return this.options.group}preventDefault(){this.event.preventDefault()}getData(){return this.options.getData()}constructor(event,options){this.event=event,this.options=options}}class GroupDragHandler extends DragHandler{constructor(element,accessor,group,disabled){super(element,disabled),this.accessor=accessor,this.group=group,this.panelTransfer=LocalSelectionTransfer.getInstance(),this.addDisposables(addDisposableListener(element,"pointerdown",e=>{e.shiftKey&&quasiPreventDefault(e)},!0))}isCancelled(_event){return this.group.api.location.type==="floating"&&!_event.shiftKey}getData(dragEvent){const dataTransfer=dragEvent.dataTransfer;this.panelTransfer.setData([new PanelTransfer(this.accessor.id,this.group.id,null)],PanelTransfer.prototype);const style=window.getComputedStyle(this.el),bgColor=style.getPropertyValue("--dv-activegroup-visiblepanel-tab-background-color"),color=style.getPropertyValue("--dv-activegroup-visiblepanel-tab-color");if(dataTransfer){const ghostElement=document.createElement("div");ghostElement.style.backgroundColor=bgColor,ghostElement.style.color=color,ghostElement.style.padding="2px 8px",ghostElement.style.height="24px",ghostElement.style.fontSize="11px",ghostElement.style.lineHeight="20px",ghostElement.style.borderRadius="12px",ghostElement.style.position="absolute",ghostElement.style.pointerEvents="none",ghostElement.style.top="-9999px",ghostElement.textContent=`Multiple Panels (${this.group.size})`,addGhostImage(dataTransfer,ghostElement,{y:-10,x:30})}return{dispose:()=>{this.panelTransfer.clearData(PanelTransfer.prototype)}}}}class VoidContainer extends CompositeDisposable{get element(){return this._element}constructor(accessor,group){super(),this.accessor=accessor,this.group=group,this._onDrop=new Emitter,this.onDrop=this._onDrop.event,this._onDragStart=new Emitter,this.onDragStart=this._onDragStart.event,this._element=document.createElement("div"),this._element.className="dv-void-container",this._element.draggable=!this.accessor.options.disableDnd,toggleClass(this._element,"dv-draggable",!this.accessor.options.disableDnd),this.addDisposables(this._onDrop,this._onDragStart,addDisposableListener(this._element,"pointerdown",()=>{this.accessor.doSetGroupActive(this.group)})),this.handler=new GroupDragHandler(this._element,accessor,group,!!this.accessor.options.disableDnd),this.dropTarget=new Droptarget(this._element,{acceptedTargetZones:["center"],canDisplayOverlay:(event,position)=>{const data=getPanelData();return data&&this.accessor.id===data.viewId?!0:group.model.canDisplayOverlay(event,position,"header_space")},getOverrideTarget:()=>{var _a;return(_a=group.model.dropTargetContainer)===null||_a===void 0?void 0:_a.model}}),this.onWillShowOverlay=this.dropTarget.onWillShowOverlay,this.addDisposables(this.handler,this.handler.onDragStart(event=>{this._onDragStart.fire(event)}),this.dropTarget.onDrop(event=>{this._onDrop.fire(event)}),this.dropTarget)}updateDragAndDropState(){this._element.draggable=!this.accessor.options.disableDnd,toggleClass(this._element,"dv-draggable",!this.accessor.options.disableDnd),this.handler.setDisabled(!!this.accessor.options.disableDnd)}}class Scrollbar extends CompositeDisposable{get element(){return this._element}get orientation(){return this._orientation}set orientation(value2){this._orientation!==value2&&(this._scrollOffset=0,this._orientation=value2,removeClasses(this._scrollbar,"dv-scrollbar-vertical","dv-scrollbar-horizontal"),value2==="vertical"?addClasses(this._scrollbar,"dv-scrollbar-vertical"):addClasses(this._scrollbar,"dv-scrollbar-horizontal"))}constructor(scrollableElement){super(),this.scrollableElement=scrollableElement,this._scrollOffset=0,this._orientation="horizontal",this._element=document.createElement("div"),this._element.className="dv-scrollable",this._scrollbar=document.createElement("div"),this._scrollbar.className="dv-scrollbar dv-scrollbar-horizontal",this.element.appendChild(scrollableElement),this.element.appendChild(this._scrollbar),this.addDisposables(addDisposableListener(this.element,"wheel",event=>{this._scrollOffset+=event.deltaY*Scrollbar.MouseWheelSpeed,this.calculateScrollbarStyles()}),addDisposableListener(this._scrollbar,"pointerdown",event=>{event.preventDefault(),toggleClass(this.element,"dv-scrollable-scrolling",!0);const originalClient=this._orientation==="horizontal"?event.clientX:event.clientY,originalScrollOffset=this._scrollOffset,onPointerMove=event2=>{const delta=this._orientation==="horizontal"?event2.clientX-originalClient:event2.clientY-originalClient,clientSize=this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight,scrollSize=this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight,p=clientSize/scrollSize;this._scrollOffset=originalScrollOffset+delta/p,this.calculateScrollbarStyles()},onEnd=()=>{toggleClass(this.element,"dv-scrollable-scrolling",!1),document.removeEventListener("pointermove",onPointerMove),document.removeEventListener("pointerup",onEnd),document.removeEventListener("pointercancel",onEnd)};document.addEventListener("pointermove",onPointerMove),document.addEventListener("pointerup",onEnd),document.addEventListener("pointercancel",onEnd)}),addDisposableListener(this.element,"scroll",()=>{this.calculateScrollbarStyles()}),addDisposableListener(this.scrollableElement,"scroll",()=>{this._scrollOffset=this._orientation==="horizontal"?this.scrollableElement.scrollLeft:this.scrollableElement.scrollTop,this.calculateScrollbarStyles()}),watchElementResize(this.element,()=>{toggleClass(this.element,"dv-scrollable-resizing",!0),this._animationTimer&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(()=>{clearTimeout(this._animationTimer),toggleClass(this.element,"dv-scrollable-resizing",!1)},500),this.calculateScrollbarStyles()}))}calculateScrollbarStyles(){const clientSize=this._orientation==="horizontal"?this.element.clientWidth:this.element.clientHeight,scrollSize=this._orientation==="horizontal"?this.scrollableElement.scrollWidth:this.scrollableElement.scrollHeight;if(scrollSize>clientSize){const px=clientSize*(clientSize/scrollSize);this._orientation==="horizontal"?(this._scrollbar.style.width=`${px}px`,this._scrollbar.style.height=""):(this._scrollbar.style.height=`${px}px`,this._scrollbar.style.width=""),this._scrollOffset=clamp(this._scrollOffset,0,scrollSize-clientSize),this._orientation==="horizontal"?this.scrollableElement.scrollLeft=this._scrollOffset:this.scrollableElement.scrollTop=this._scrollOffset;const percentageComplete=this._scrollOffset/(scrollSize-clientSize);this._orientation==="horizontal"?(this._scrollbar.style.left=`${(clientSize-px)*percentageComplete}px`,this._scrollbar.style.top=""):(this._scrollbar.style.top=`${(clientSize-px)*percentageComplete}px`,this._scrollbar.style.left="")}else this._orientation==="horizontal"?(this._scrollbar.style.width="0px",this._scrollbar.style.left="0px"):(this._scrollbar.style.height="0px",this._scrollbar.style.top="0px"),this._scrollOffset=0}}Scrollbar.MouseWheelSpeed=1;class Tabs extends CompositeDisposable{get showTabsOverflowControl(){return this._showTabsOverflowControl}set showTabsOverflowControl(value2){if(this._showTabsOverflowControl!=value2&&(this._showTabsOverflowControl=value2,value2)){const observer=new OverflowObserver(this._tabsList);this._observerDisposable.value=new CompositeDisposable(observer,observer.onDidChange(event=>{const hasOverflow=event.hasScrollX||event.hasScrollY;this.toggleDropdown({reset:!hasOverflow})}),addDisposableListener(this._tabsList,"scroll",()=>{this.toggleDropdown({reset:!1})}))}}get element(){return this._element}get panels(){return this._tabs.map(_=>_.value.panel.id)}get size(){return this._tabs.length}get tabs(){return this._tabs.map(_=>_.value)}get direction(){return this._direction}set direction(value2){this._direction!==value2&&(this._direction=value2,this._scrollbar&&(this._scrollbar.orientation=value2),removeClasses(this._tabsList,"dv-horizontal","dv-vertical"),value2==="vertical"?addClasses(this._tabsList,"dv-tabs-container-vertical","dv-vertical"):(removeClasses(this._tabsList,"dv-tabs-container-vertical"),addClasses(this._tabsList,"dv-horizontal")))}constructor(group,accessor,options){super(),this.group=group,this.accessor=accessor,this._observerDisposable=new MutableDisposable,this._scrollbar=null,this._tabs=[],this.selectedIndex=-1,this._showTabsOverflowControl=!1,this._direction="horizontal",this._animState=null,this._onTabDragStart=new Emitter,this.onTabDragStart=this._onTabDragStart.event,this._onDrop=new Emitter,this.onDrop=this._onDrop.event,this._onWillShowOverlay=new Emitter,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onOverflowTabsChange=new Emitter,this.onOverflowTabsChange=this._onOverflowTabsChange.event,this._tabsList=document.createElement("div"),this._tabsList.className="dv-tabs-container",this.showTabsOverflowControl=options.showTabsOverflowControl,accessor.options.scrollbars==="native"?this._element=this._tabsList:(this._scrollbar=new Scrollbar(this._tabsList),this._scrollbar.orientation=this.direction,this._element=this._scrollbar.element,this.addDisposables(this._scrollbar)),this.addDisposables(this._onOverflowTabsChange,this._observerDisposable,this._onWillShowOverlay,this._onDrop,this._onTabDragStart,addDisposableListener(this.element,"pointerdown",event=>{if(event.defaultPrevented)return;event.button===0&&this.accessor.doSetGroupActive(this.group)}),addDisposableListener(this._tabsList,"dragover",event=>{if(!this._animState){if(this.accessor.options.tabAnimation!=="smooth"||this.accessor.options.disableDnd)return;const data=getPanelData();if(data&&data.panelId&&data.groupId!==this.group.id)this._animState={sourceTabId:data.panelId,sourceIndex:-1,tabPositions:this.snapshotTabPositions(),currentInsertionIndex:null};else return}this.handleDragOver(event)},!0),addDisposableListener(this._tabsList,"dragleave",event=>{this._animState&&(event.relatedTarget&&this._tabsList.contains(event.relatedTarget)||(this.resetTabTransforms(),this._animState&&(this._animState.sourceIndex===-1?this._animState=null:this._animState.currentInsertionIndex=null)))},!0),addDisposableListener(this._tabsList,"dragend",()=>{this.resetDragAnimation()}),addDisposableListener(this._tabsList,"drop",event=>{if(this.accessor.options.tabAnimation!=="smooth"||!this._animState||this._animState.currentInsertionIndex===null)return;event.stopPropagation(),event.preventDefault();const animState=this._animState;this._animState=null;const insertionIndex=animState.currentInsertionIndex,sourceIndex=animState.sourceIndex,adjustedIndex=insertionIndex-(sourceIndex!==-1&&sourceIndex<insertionIndex?1:0);if(adjustedIndex===sourceIndex){this.resetTabTransforms();return}const firstPositions=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event,index:adjustedIndex}),this.runFlipAnimation(firstPositions,animState.sourceTabId,animState.sourceIndex===-1,{from:Math.min(sourceIndex,adjustedIndex),to:Math.max(sourceIndex,adjustedIndex)})},!0),Disposable.from(()=>{this.resetDragAnimation();for(const{value:value2,disposable}of this._tabs)disposable.dispose(),value2.dispose();this._tabs=[]}))}indexOf(id){return this._tabs.findIndex(tab=>tab.value.panel.id===id)}isActive(tab){return this.selectedIndex>-1&&this._tabs[this.selectedIndex].value===tab}setActivePanel(panel2){let runningWidth=0;for(const tab of this._tabs){const isActivePanel=panel2.id===tab.value.panel.id;if(tab.value.setActive(isActivePanel),isActivePanel){const element=tab.value.element,parentElement=element.parentElement;(runningWidth<parentElement.scrollLeft||runningWidth+element.clientWidth>parentElement.scrollLeft+parentElement.clientWidth)&&(parentElement.scrollLeft=runningWidth)}runningWidth+=tab.value.element.clientWidth}}openPanel(panel2,index=this._tabs.length){if(this._tabs.find(tab2=>tab2.value.panel.id===panel2.id))return;const tab=new Tab(panel2,this.accessor,this.group);tab.setContent(panel2.view.tab);const disposable=new CompositeDisposable(tab.onDragStart(event=>{this._onTabDragStart.fire({nativeEvent:event,panel:panel2}),this.accessor.options.tabAnimation==="smooth"&&(this._animState={sourceTabId:panel2.id,sourceIndex:this._tabs.findIndex(x=>x.value===tab),tabPositions:this.snapshotTabPositions(),currentInsertionIndex:null})}),tab.onPointerDown(event=>{if(event.defaultPrevented)return;const isFloatingGroupsEnabled=!this.accessor.options.disableFloatingGroups,isFloatingWithOnePanel=this.group.api.location.type==="floating"&&this.size===1;if(isFloatingGroupsEnabled&&!isFloatingWithOnePanel&&event.shiftKey){event.preventDefault();const panel3=this.accessor.getGroupPanel(tab.panel.id),{top,left}=tab.element.getBoundingClientRect(),{top:rootTop,left:rootLeft}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(panel3,{x:left-rootLeft,y:top-rootTop,inDragMode:!0});return}switch(event.button){case 0:this.group.activePanel!==panel2&&this.group.model.openPanel(panel2);break}}),tab.onDrop(event=>{const animState=this._animState;this._animState=null;const dropIndex=this._tabs.findIndex(x=>x.value===tab);if(animState){const firstPositions=this.snapshotTabPositions();this.resetTabTransforms(),this._onDrop.fire({event:event.nativeEvent,index:dropIndex}),this.runFlipAnimation(firstPositions,animState.sourceTabId,animState.sourceIndex===-1,animState.sourceIndex!==-1?{from:Math.min(animState.sourceIndex,dropIndex),to:Math.max(animState.sourceIndex,dropIndex)}:void 0)}else this._onDrop.fire({event:event.nativeEvent,index:dropIndex})}),tab.onWillShowOverlay(event=>{this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event,{kind:"tab",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:getPanelData}))})),value2={value:tab,disposable};this.addTab(value2,index),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this.applyDragOverTransforms())}delete(id){var _a;((_a=this._animState)===null||_a===void 0?void 0:_a.sourceTabId)===id&&(this.resetTabTransforms(),this._animState=null);const index=this.indexOf(id),tabToRemove=this._tabs.splice(index,1)[0],{value:value2,disposable}=tabToRemove;disposable.dispose(),value2.dispose(),value2.element.remove(),this._animState&&(this._animState.tabPositions=this.snapshotTabPositions(),this.applyDragOverTransforms())}addTab(tab,index=this._tabs.length){if(index<0||index>this._tabs.length)throw new Error("invalid location");this._tabsList.insertBefore(tab.value.element,this._tabsList.children[index]),this._tabs=[...this._tabs.slice(0,index),tab,...this._tabs.slice(index)],this.selectedIndex<0&&(this.selectedIndex=index)}toggleDropdown(options){const tabs=options.reset?[]:this._tabs.filter(tab=>!isChildEntirelyVisibleWithinParent(tab.value.element,this._tabsList)).map(x=>x.value.panel.id);this._onOverflowTabsChange.fire({tabs,reset:options.reset})}updateDragAndDropState(){for(const tab of this._tabs)tab.value.updateDragAndDropState()}snapshotTabPositions(){const positions=new Map;for(const tab of this._tabs)positions.set(tab.value.panel.id,tab.value.element.getBoundingClientRect());return positions}getAverageTabWidth(){if(this._tabs.length===0)return 0;let totalWidth=0;for(const tab of this._tabs)totalWidth+=tab.value.element.getBoundingClientRect().width;return totalWidth/this._tabs.length}handleDragOver(event){if(!this._animState)return;const mouseX=event.clientX;let insertionIndex=null;for(let i=0;i<this._tabs.length;i++){const tab=this._tabs[i].value;if(tab.panel.id===this._animState.sourceTabId)continue;const rect=tab.element.getBoundingClientRect(),midpoint=rect.left+rect.width/2;if(mouseX<midpoint){insertionIndex=i;break}insertionIndex=i+1}insertionIndex!==this._animState.currentInsertionIndex&&(this._animState.currentInsertionIndex=insertionIndex,this.applyDragOverTransforms())}applyDragOverTransforms(){if(!this._animState||this._animState.currentInsertionIndex===null){this.resetTabTransforms();return}const insertionIndex=this._animState.currentInsertionIndex,sourceRect=this._animState.tabPositions.get(this._animState.sourceTabId),gapWidth=sourceRect?sourceRect.width:this.getAverageTabWidth();let gapApplied=!1;for(let i=0;i<this._tabs.length;i++){const tab=this._tabs[i].value;if(tab.panel.id!==this._animState.sourceTabId)if(!gapApplied&&i>=insertionIndex)tab.element.style.marginLeft=`${gapWidth}px`,toggleClass(tab.element,"dv-tab--shifting",!0),gapApplied=!0;else if(tab.element.style.marginLeft){tab.element.style.marginLeft="0px",toggleClass(tab.element,"dv-tab--shifting",!0);const onEnd=()=>{tab.element.style.removeProperty("margin-left"),toggleClass(tab.element,"dv-tab--shifting",!1),tab.element.removeEventListener("transitionend",onEnd)};tab.element.addEventListener("transitionend",onEnd)}else toggleClass(tab.element,"dv-tab--shifting",!1)}}resetTabTransforms(){for(const tab of this._tabs)tab.value.element.style.removeProperty("margin-left"),tab.value.element.style.removeProperty("transform"),toggleClass(tab.value.element,"dv-tab--shifting",!1)}resetDragAnimation(){this.resetTabTransforms(),this._animState=null;for(const tab of this._tabs)toggleClass(tab.value.element,"dv-tab--dragging",!1)}runFlipAnimation(firstPositions,sourceTabId,isCrossGroup=!1,animRange){let hasAnimation=!1;for(let i=0;i<this._tabs.length;i++){const tab=this._tabs[i],panelId=tab.value.panel.id;if(panelId===sourceTabId){if(isCrossGroup){const rect=tab.value.element.getBoundingClientRect();tab.value.element.style.transform=`translateX(${rect.width}px)`,toggleClass(tab.value.element,"dv-tab--shifting",!0),hasAnimation=!0}continue}if(animRange!==void 0&&(i<animRange.from||i>animRange.to))continue;const firstRect=firstPositions.get(panelId);if(!firstRect)continue;const lastRect=tab.value.element.getBoundingClientRect(),deltaX=firstRect.left-lastRect.left;Math.abs(deltaX)<1||(tab.value.element.style.transform=`translateX(${deltaX}px)`,toggleClass(tab.value.element,"dv-tab--shifting",!0),hasAnimation=!0)}hasAnimation&&requestAnimationFrame(()=>{for(const tab of this._tabs)tab.value.element.style.transform&&(tab.value.element.style.transform="");const onTransitionEnd=event=>{if(event.propertyName==="transform"){this._tabsList.removeEventListener("transitionend",onTransitionEnd);for(const tab of this._tabs)toggleClass(tab.value.element,"dv-tab--shifting",!1)}};this._tabsList.addEventListener("transitionend",onTransitionEnd)})}}const createSvgElementFromPath=params=>{const svg=document.createElementNS("http://www.w3.org/2000/svg","svg");svg.setAttributeNS(null,"height",params.height),svg.setAttributeNS(null,"width",params.width),svg.setAttributeNS(null,"viewBox",params.viewbox),svg.setAttributeNS(null,"aria-hidden","false"),svg.setAttributeNS(null,"focusable","false"),svg.classList.add("dv-svg");const path=document.createElementNS("http://www.w3.org/2000/svg","path");return path.setAttributeNS(null,"d",params.path),svg.appendChild(path),svg},createCloseButton=()=>createSvgElementFromPath({width:"11",height:"11",viewbox:"0 0 28 28",path:"M2.1 27.3L0 25.2L11.55 13.65L0 2.1L2.1 0L13.65 11.55L25.2 0L27.3 2.1L15.75 13.65L27.3 25.2L25.2 27.3L13.65 15.75L2.1 27.3Z"}),createExpandMoreButton=()=>createSvgElementFromPath({width:"11",height:"11",viewbox:"0 0 24 15",path:"M12 14.15L0 2.15L2.15 0L12 9.9L21.85 0.0499992L24 2.2L12 14.15Z"}),createChevronRightButton=()=>createSvgElementFromPath({width:"11",height:"11",viewbox:"0 0 15 25",path:"M2.15 24.1L0 21.95L9.9 12.05L0 2.15L2.15 0L14.2 12.05L2.15 24.1Z"});function createDropdownElementHandle(){const el=document.createElement("div");el.className="dv-tabs-overflow-dropdown-default";const text=document.createElement("span");text.textContent="";const icon=createChevronRightButton();return el.appendChild(icon),el.appendChild(text),{element:el,update:params=>{text.textContent=`${params.tabs}`}}}class TabsContainer extends CompositeDisposable{get onTabDragStart(){return this.tabs.onTabDragStart}get panels(){return this.tabs.panels}get size(){return this.tabs.size}get hidden(){return this._hidden}set hidden(value2){this._hidden=value2,this.element.style.display=value2?"none":""}get direction(){return this._direction}set direction(value2){this._direction=value2,value2==="vertical"?(addClasses(this._element,"dv-groupview-header-vertical"),addClasses(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=value2):(removeClasses(this._element,"dv-groupview-header-vertical"),removeClasses(this.rightActionsContainer,"dv-right-actions-container-vertical"),this.tabs.direction=value2)}get element(){return this._element}constructor(accessor,group){super(),this.accessor=accessor,this.group=group,this._hidden=!1,this._direction="horizontal",this.dropdownPart=null,this._overflowTabs=[],this._dropdownDisposable=new MutableDisposable,this._onDrop=new Emitter,this.onDrop=this._onDrop.event,this._onGroupDragStart=new Emitter,this.onGroupDragStart=this._onGroupDragStart.event,this._onWillShowOverlay=new Emitter,this.onWillShowOverlay=this._onWillShowOverlay.event,this._element=document.createElement("div"),this._element.className="dv-tabs-and-actions-container",toggleClass(this._element,"dv-full-width-single-tab",this.accessor.options.singleTabMode==="fullwidth"),this.rightActionsContainer=document.createElement("div"),this.rightActionsContainer.className="dv-right-actions-container",this.leftActionsContainer=document.createElement("div"),this.leftActionsContainer.className="dv-left-actions-container",this.preActionsContainer=document.createElement("div"),this.preActionsContainer.className="dv-pre-actions-container",this.tabs=new Tabs(group,accessor,{showTabsOverflowControl:!accessor.options.disableTabsOverflowList}),this.voidContainer=new VoidContainer(this.accessor,this.group),this._element.appendChild(this.preActionsContainer),this._element.appendChild(this.tabs.element),this._element.appendChild(this.leftActionsContainer),this._element.appendChild(this.voidContainer.element),this._element.appendChild(this.rightActionsContainer),this.addDisposables(this.tabs.onDrop(e=>this._onDrop.fire(e)),this.tabs.onWillShowOverlay(e=>this._onWillShowOverlay.fire(e)),accessor.onDidOptionsChange(()=>{this.tabs.showTabsOverflowControl=!accessor.options.disableTabsOverflowList}),this.tabs.onOverflowTabsChange(event=>{this.toggleDropdown(event)}),this.tabs,this._onWillShowOverlay,this._onDrop,this._onGroupDragStart,this.voidContainer,this.voidContainer.onDragStart(event=>{this._onGroupDragStart.fire({nativeEvent:event,group:this.group})}),this.voidContainer.onDrop(event=>{this._onDrop.fire({event:event.nativeEvent,index:this.tabs.size})}),this.voidContainer.onWillShowOverlay(event=>{this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event,{kind:"header_space",panel:this.group.activePanel,api:this.accessor.api,group:this.group,getData:getPanelData}))}),addDisposableListener(this.voidContainer.element,"pointerdown",event=>{if(event.defaultPrevented)return;if(!this.accessor.options.disableFloatingGroups&&event.shiftKey&&this.group.api.location.type!=="floating"){event.preventDefault();const{top,left}=this.element.getBoundingClientRect(),{top:rootTop,left:rootLeft}=this.accessor.element.getBoundingClientRect();this.accessor.addFloatingGroup(this.group,{x:left-rootLeft+20,y:top-rootTop+20,inDragMode:!0})}}))}show(){this.hidden||(this.element.style.display="")}hide(){this._element.style.display="none"}setRightActionsElement(element){this.rightActions!==element&&(this.rightActions&&(this.rightActions.remove(),this.rightActions=void 0),element&&(this.rightActionsContainer.appendChild(element),this.rightActions=element))}setLeftActionsElement(element){this.leftActions!==element&&(this.leftActions&&(this.leftActions.remove(),this.leftActions=void 0),element&&(this.leftActionsContainer.appendChild(element),this.leftActions=element))}setPrefixActionsElement(element){this.preActions!==element&&(this.preActions&&(this.preActions.remove(),this.preActions=void 0),element&&(this.preActionsContainer.appendChild(element),this.preActions=element))}isActive(tab){return this.tabs.isActive(tab)}indexOf(id){return this.tabs.indexOf(id)}setActive(_isGroupActive){}delete(id){this.tabs.delete(id),this.updateClassnames()}setActivePanel(panel2){this.tabs.setActivePanel(panel2)}openPanel(panel2,index=this.tabs.size){this.tabs.openPanel(panel2,index),this.updateClassnames()}closePanel(panel2){this.delete(panel2.id)}updateClassnames(){toggleClass(this._element,"dv-single-tab",this.size===1)}toggleDropdown(options){const tabs=options.reset?[]:options.tabs;if(this._overflowTabs=tabs,this._overflowTabs.length>0&&this.dropdownPart){this.dropdownPart.update({tabs:tabs.length});return}if(this._overflowTabs.length===0){this._dropdownDisposable.dispose();return}const root=document.createElement("div");root.className="dv-tabs-overflow-dropdown-root";const part=createDropdownElementHandle();part.update({tabs:tabs.length}),this.dropdownPart=part,root.appendChild(part.element),this.rightActionsContainer.prepend(root),this._dropdownDisposable.value=new CompositeDisposable(Disposable.from(()=>{var _a,_b;root.remove(),(_b=(_a=this.dropdownPart)===null||_a===void 0?void 0:_a.dispose)===null||_b===void 0||_b.call(_a),this.dropdownPart=null}),addDisposableListener(root,"pointerdown",event=>{event.preventDefault()},{capture:!0}),addDisposableListener(root,"click",event=>{const el=document.createElement("div");el.style.overflow="auto",el.className="dv-tabs-overflow-container";for(const tab of this.tabs.tabs.filter(tab2=>this._overflowTabs.includes(tab2.panel.id))){const panelObject=this.group.panels.find(panel2=>panel2===tab.panel),child=panelObject.view.createTabRenderer("headerOverflow").element,wrapper=document.createElement("div");toggleClass(wrapper,"dv-tab",!0),toggleClass(wrapper,"dv-active-tab",panelObject.api.isActive),toggleClass(wrapper,"dv-inactive-tab",!panelObject.api.isActive),wrapper.addEventListener("click",event2=>{this.accessor.popupService.close(),!event2.defaultPrevented&&(tab.element.scrollIntoView(),tab.panel.api.setActive())}),wrapper.appendChild(child),el.appendChild(wrapper)}const relativeParent=findRelativeZIndexParent(root);this.accessor.popupService.openPopover(el,{x:event.clientX,y:event.clientY,zIndex:relativeParent?.style.zIndex?`calc(${relativeParent.style.zIndex} * 2)`:void 0})}))}updateDragAndDropState(){this.tabs.updateDragAndDropState(),this.voidContainer.updateDragAndDropState()}}class DockviewUnhandledDragOverEvent extends AcceptableEvent{constructor(nativeEvent,target,position,getData,group){super(),this.nativeEvent=nativeEvent,this.target=target,this.position=position,this.getData=getData,this.group=group}}const PROPERTY_KEYS_DOCKVIEW=Object.keys({disableAutoResizing:void 0,hideBorders:void 0,singleTabMode:void 0,disableFloatingGroups:void 0,floatingGroupBounds:void 0,popoutUrl:void 0,defaultRenderer:void 0,defaultHeaderPosition:void 0,debug:void 0,rootOverlayModel:void 0,locked:void 0,disableDnd:void 0,className:void 0,noPanelsOverlay:void 0,dndEdges:void 0,theme:void 0,disableTabsOverflowList:void 0,scrollbars:void 0,tabAnimation:void 0});function isPanelOptionsWithPanel(data){return!!data.referencePanel}function isPanelOptionsWithGroup(data){return!!data.referenceGroup}function isGroupOptionsWithPanel(data){return!!data.referencePanel}function isGroupOptionsWithGroup(data){return!!data.referenceGroup}class DockviewDidDropEvent extends DockviewEvent{get nativeEvent(){return this.options.nativeEvent}get position(){return this.options.position}get panel(){return this.options.panel}get group(){return this.options.group}get api(){return this.options.api}constructor(options){super(),this.options=options}getData(){return this.options.getData()}}class DockviewWillDropEvent extends DockviewDidDropEvent{get kind(){return this._kind}constructor(options){super(options),this._kind=options.kind}}class DockviewGroupPanelModel extends CompositeDisposable{get element(){throw new Error("dockview: not supported")}get activePanel(){return this._activePanel}get locked(){return this._locked}set locked(value2){this._locked=value2,toggleClass(this.container,"dv-locked-groupview",value2==="no-drop-target"||value2)}get isActive(){return this._isGroupActive}get panels(){return this._panels}get size(){return this._panels.length}get isEmpty(){return this._panels.length===0}get hasWatermark(){return!!(this.watermark&&this.container.contains(this.watermark.element))}get header(){return this.tabsContainer}get isContentFocused(){return document.activeElement?isAncestor(document.activeElement,this.contentContainer.element):!1}get headerPosition(){var _a;return(_a=this._headerPosition)!==null&&_a!==void 0?_a:"top"}set headerPosition(value2){var _a;this._headerPosition=value2,removeClasses(this.container,"dv-groupview-header-top","dv-groupview-header-bottom","dv-groupview-header-left","dv-groupview-header-right"),addClasses(this.container,`dv-groupview-header-${value2}`);const direction=value2==="top"||value2==="bottom"?"horizontal":"vertical";this.tabsContainer.direction=direction,this.header.direction=direction,!((_a=this._activePanel)===null||_a===void 0)&&_a.layout&&this._activePanel.layout(this._width,this._height),(this._leftHeaderActions||this._rightHeaderActions||this._prefixHeaderActions)&&this.updateHeaderActions()}get location(){return this._location}set location(value2){switch(this._location=value2,toggleClass(this.container,"dv-groupview-floating",!1),toggleClass(this.container,"dv-groupview-popout",!1),value2.type){case"grid":this.contentContainer.dropTarget.setTargetZones(["top","bottom","left","right","center"]);break;case"floating":this.contentContainer.dropTarget.setTargetZones(["center"]),this.contentContainer.dropTarget.setTargetZones(value2?["center"]:["top","bottom","left","right","center"]),toggleClass(this.container,"dv-groupview-floating",!0);break;case"popout":this.contentContainer.dropTarget.setTargetZones(["center"]),toggleClass(this.container,"dv-groupview-popout",!0);break}this.groupPanel.api._onDidLocationChange.fire({location:this.location})}constructor(container2,accessor,id,options,groupPanel){var _a,_b;super(),this.container=container2,this.accessor=accessor,this.id=id,this.options=options,this.groupPanel=groupPanel,this._isGroupActive=!1,this._locked=!1,this._rightHeaderActionsDisposable=new MutableDisposable,this._leftHeaderActionsDisposable=new MutableDisposable,this._prefixHeaderActionsDisposable=new MutableDisposable,this._location={type:"grid"},this.mostRecentlyUsed=[],this._overwriteRenderContainer=null,this._overwriteDropTargetContainer=null,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._width=0,this._height=0,this._panels=[],this._panelDisposables=new Map,this._onMove=new Emitter,this.onMove=this._onMove.event,this._onDidDrop=new Emitter,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new Emitter,this.onWillDrop=this._onWillDrop.event,this._onWillShowOverlay=new Emitter,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onTabDragStart=new Emitter,this.onTabDragStart=this._onTabDragStart.event,this._onGroupDragStart=new Emitter,this.onGroupDragStart=this._onGroupDragStart.event,this._onDidAddPanel=new Emitter,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPanelTitleChange=new Emitter,this.onDidPanelTitleChange=this._onDidPanelTitleChange.event,this._onDidPanelParametersChange=new Emitter,this.onDidPanelParametersChange=this._onDidPanelParametersChange.event,this._onDidRemovePanel=new Emitter,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidActivePanelChange=new Emitter,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onUnhandledDragOverEvent=new Emitter,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,toggleClass(this.container,"dv-groupview",!0),this._api=new DockviewApi(this.accessor),this.tabsContainer=new TabsContainer(this.accessor,this.groupPanel),this.contentContainer=new ContentContainer(this.accessor,this),container2.append(this.tabsContainer.element,this.contentContainer.element),this.header.hidden=!!options.hideHeader,this.locked=(_a=options.locked)!==null&&_a!==void 0?_a:!1,this.headerPosition=(_b=options.headerPosition)!==null&&_b!==void 0?_b:accessor.defaultHeaderPosition,this.addDisposables(this._onTabDragStart,this._onGroupDragStart,this._onWillShowOverlay,this._rightHeaderActionsDisposable,this._leftHeaderActionsDisposable,this._prefixHeaderActionsDisposable,this.tabsContainer.onTabDragStart(event=>{this._onTabDragStart.fire(event)}),this.tabsContainer.onGroupDragStart(event=>{this._onGroupDragStart.fire(event)}),this.tabsContainer.onDrop(event=>{this.handleDropEvent("header",event.event,"center",event.index)}),this.contentContainer.onDidFocus(()=>{this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.onDidBlur(()=>{}),this.contentContainer.dropTarget.onDrop(event=>{this.handleDropEvent("content",event.nativeEvent,event.position)}),this.tabsContainer.onWillShowOverlay(event=>{this._onWillShowOverlay.fire(event)}),this.contentContainer.dropTarget.onWillShowOverlay(event=>{this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event,{kind:"content",panel:this.activePanel,api:this._api,group:this.groupPanel,getData:getPanelData}))}),this._onMove,this._onDidChange,this._onDidDrop,this._onWillDrop,this._onDidAddPanel,this._onDidRemovePanel,this._onDidActivePanelChange,this._onUnhandledDragOverEvent,this._onDidPanelTitleChange,this._onDidPanelParametersChange)}focusContent(){this.contentContainer.element.focus()}set renderContainer(value2){this.panels.forEach(panel2=>{this.renderContainer.detatch(panel2)}),this._overwriteRenderContainer=value2,this.panels.forEach(panel2=>{this.rerender(panel2)})}get renderContainer(){var _a;return(_a=this._overwriteRenderContainer)!==null&&_a!==void 0?_a:this.accessor.overlayRenderContainer}set dropTargetContainer(value2){this._overwriteDropTargetContainer=value2}get dropTargetContainer(){var _a;return(_a=this._overwriteDropTargetContainer)!==null&&_a!==void 0?_a:this.accessor.rootDropTargetContainer}initialize(){this.options.panels&&this.options.panels.forEach(panel2=>{this.doAddPanel(panel2)}),this.options.activePanel&&this.openPanel(this.options.activePanel),this.setActive(this.isActive,!0),this.updateContainer(),this.updateHeaderActions()}updateHeaderActions(){this.accessor.options.createRightHeaderActionComponent?(this._rightHeaderActions=this.accessor.options.createRightHeaderActionComponent(this.groupPanel),this._rightHeaderActionsDisposable.value=this._rightHeaderActions,this._rightHeaderActions.init({containerApi:this._api,api:this.groupPanel.api,group:this.groupPanel}),this.tabsContainer.setRightActionsElement(this._rightHeaderActions.element)):(this._rightHeaderActions=void 0,this._rightHeaderActionsDisposable.dispose(),this.tabsContainer.setRightActionsElement(void 0)),this.accessor.options.createLeftHeaderActionComponent?(this._leftHeaderActions=this.accessor.options.createLeftHeaderActionComponent(this.groupPanel),this._leftHeaderActionsDisposable.value=this._leftHeaderActions,this._leftHeaderActions.init({containerApi:this._api,api:this.groupPanel.api,group:this.groupPanel}),this.tabsContainer.setLeftActionsElement(this._leftHeaderActions.element)):(this._leftHeaderActions=void 0,this._leftHeaderActionsDisposable.dispose(),this.tabsContainer.setLeftActionsElement(void 0)),this.accessor.options.createPrefixHeaderActionComponent?(this._prefixHeaderActions=this.accessor.options.createPrefixHeaderActionComponent(this.groupPanel),this._prefixHeaderActionsDisposable.value=this._prefixHeaderActions,this._prefixHeaderActions.init({containerApi:this._api,api:this.groupPanel.api,group:this.groupPanel}),this.tabsContainer.setPrefixActionsElement(this._prefixHeaderActions.element)):(this._prefixHeaderActions=void 0,this._prefixHeaderActionsDisposable.dispose(),this.tabsContainer.setPrefixActionsElement(void 0))}rerender(panel2){this.contentContainer.renderPanel(panel2,{asActive:!1})}indexOf(panel2){return this.tabsContainer.indexOf(panel2.id)}toJSON(){var _a;const result={views:this.tabsContainer.panels,activeView:(_a=this._activePanel)===null||_a===void 0?void 0:_a.id,id:this.id};return this.locked!==!1&&(result.locked=this.locked),this.header.hidden&&(result.hideHeader=!0),this.headerPosition!=="top"&&(result.headerPosition=this.headerPosition),result}moveToNext(options){options||(options={}),options.panel||(options.panel=this.activePanel);const index=options.panel?this.panels.indexOf(options.panel):-1;let normalizedIndex;if(index<this.panels.length-1)normalizedIndex=index+1;else if(!options.suppressRoll)normalizedIndex=0;else return;this.openPanel(this.panels[normalizedIndex])}moveToPrevious(options){if(options||(options={}),options.panel||(options.panel=this.activePanel),!options.panel)return;const index=this.panels.indexOf(options.panel);let normalizedIndex;if(index>0)normalizedIndex=index-1;else if(!options.suppressRoll)normalizedIndex=this.panels.length-1;else return;this.openPanel(this.panels[normalizedIndex])}containsPanel(panel2){return this.panels.includes(panel2)}init(_params){}update(_params){}focus(){var _a;(_a=this._activePanel)===null||_a===void 0||_a.focus()}openPanel(panel2,options={}){(typeof options.index!="number"||options.index>this.panels.length)&&(options.index=this.panels.length);const skipSetActive=!!options.skipSetActive;if(panel2.updateParentGroup(this.groupPanel,{skipSetActive:options.skipSetActive}),this.doAddPanel(panel2,options.index,{skipSetActive}),this._activePanel===panel2){this.contentContainer.renderPanel(panel2,{asActive:!0});return}skipSetActive||this.doSetActivePanel(panel2),options.skipSetGroupActive||this.accessor.doSetGroupActive(this.groupPanel),options.skipSetActive||this.updateContainer()}removePanel(groupItemOrId,options={skipSetActive:!1}){const id=typeof groupItemOrId=="string"?groupItemOrId:groupItemOrId.id,panelToRemove=this._panels.find(panel2=>panel2.id===id);if(!panelToRemove)throw new Error("invalid operation");return this._removePanel(panelToRemove,options)}closeAllPanels(){if(this.panels.length>0){const arrPanelCpy=[...this.panels];for(const panel2 of arrPanelCpy)this.doClose(panel2)}else this.accessor.removeGroup(this.groupPanel)}closePanel(panel2){this.doClose(panel2)}doClose(panel2){const isLast=this.panels.length===1&&this.accessor.groups.length===1;this.accessor.removePanel(panel2,isLast&&this.accessor.options.noPanelsOverlay==="emptyGroup"?{removeEmptyGroup:!1}:void 0)}isPanelActive(panel2){return this._activePanel===panel2}updateActions(element){this.tabsContainer.setRightActionsElement(element)}setActive(isGroupActive,force=!1){!force&&this.isActive===isGroupActive||(this._isGroupActive=isGroupActive,toggleClass(this.container,"dv-active-group",isGroupActive),toggleClass(this.container,"dv-inactive-group",!isGroupActive),this.tabsContainer.setActive(this.isActive),!this._activePanel&&this.panels.length>0&&this.doSetActivePanel(this.panels[0]),this.updateContainer())}layout(width,height){var _a;this._width=width,this._height=height,this.contentContainer.layout(this._width,this._height),!((_a=this._activePanel)===null||_a===void 0)&&_a.layout&&this._activePanel.layout(this._width,this._height)}_removePanel(panel2,options){const isActivePanel=this._activePanel===panel2;if(this.doRemovePanel(panel2),isActivePanel&&this.panels.length>0){const nextPanel=this.mostRecentlyUsed[0];this.openPanel(nextPanel,{skipSetActive:options.skipSetActive,skipSetGroupActive:options.skipSetActiveGroup})}return this._activePanel&&this.panels.length===0&&this.doSetActivePanel(void 0),options.skipSetActive||this.updateContainer(),panel2}doRemovePanel(panel2){const index=this.panels.indexOf(panel2);if(this._activePanel===panel2&&this.contentContainer.closePanel(),this.tabsContainer.delete(panel2.id),this._panels.splice(index,1),this.mostRecentlyUsed.includes(panel2)){const index2=this.mostRecentlyUsed.indexOf(panel2);this.mostRecentlyUsed.splice(index2,1)}const disposable=this._panelDisposables.get(panel2.id);disposable&&(disposable.dispose(),this._panelDisposables.delete(panel2.id)),this._onDidRemovePanel.fire({panel:panel2})}doAddPanel(panel2,index=this.panels.length,options={skipSetActive:!1}){const hasExistingPanel=this._panels.indexOf(panel2)>-1;this.tabsContainer.show(),this.contentContainer.show(),this.tabsContainer.openPanel(panel2,index),options.skipSetActive?panel2.api.renderer==="always"&&this.contentContainer.renderPanel(panel2,{asActive:!1}):this.contentContainer.openPanel(panel2),!hasExistingPanel&&(this.updateMru(panel2),this.panels.splice(index,0,panel2),this._panelDisposables.set(panel2.id,new CompositeDisposable(panel2.api.onDidTitleChange(event=>this._onDidPanelTitleChange.fire(event)),panel2.api.onDidParametersChange(event=>this._onDidPanelParametersChange.fire(event)))),this._onDidAddPanel.fire({panel:panel2}))}doSetActivePanel(panel2){this._activePanel!==panel2&&(this._activePanel=panel2,panel2&&(this.tabsContainer.setActivePanel(panel2),this.contentContainer.openPanel(panel2),panel2.layout(this._width,this._height),this.updateMru(panel2),this.contentContainer.refreshFocusState(),this._onDidActivePanelChange.fire({panel:panel2})))}updateMru(panel2){this.mostRecentlyUsed.includes(panel2)&&this.mostRecentlyUsed.splice(this.mostRecentlyUsed.indexOf(panel2),1),this.mostRecentlyUsed=[panel2,...this.mostRecentlyUsed]}updateContainer(){var _a,_b;if(this.panels.forEach(panel2=>panel2.runEvents()),this.isEmpty&&!this.watermark){const watermark=this.accessor.createWatermarkComponent();watermark.init({containerApi:this._api,group:this.groupPanel}),this.watermark=watermark,addDisposableListener(this.watermark.element,"pointerdown",()=>{this.isActive||this.accessor.doSetGroupActive(this.groupPanel)}),this.contentContainer.element.appendChild(this.watermark.element)}!this.isEmpty&&this.watermark&&(this.watermark.element.remove(),(_b=(_a=this.watermark).dispose)===null||_b===void 0||_b.call(_a),this.watermark=void 0)}canDisplayOverlay(event,position,target){const firedEvent=new DockviewUnhandledDragOverEvent(event,target,position,getPanelData,this.accessor.getPanel(this.id));return this._onUnhandledDragOverEvent.fire(firedEvent),firedEvent.isAccepted}handleDropEvent(type,event,position,index){if(this.locked==="no-drop-target")return;function getKind(){switch(type){case"header":return typeof index=="number"?"tab":"header_space";case"content":return"content"}}const panel2=typeof index=="number"?this.panels[index]:void 0,willDropEvent=new DockviewWillDropEvent({nativeEvent:event,position,panel:panel2,getData:()=>getPanelData(),kind:getKind(),group:this.groupPanel,api:this._api});if(this._onWillDrop.fire(willDropEvent),willDropEvent.defaultPrevented)return;const data=getPanelData();if(data&&data.viewId===this.accessor.id){if(type==="content"&&data.groupId===this.id&&(position==="center"||data.panelId===null)||type==="header"&&data.groupId===this.id&&data.panelId===null)return;if(data.panelId===null){const{groupId:groupId2}=data;this._onMove.fire({target:position,groupId:groupId2,index});return}if(this.tabsContainer.indexOf(data.panelId)!==-1&&this.tabsContainer.size===1)return;const{groupId,panelId}=data;if(this.id===groupId&&!position&&this.tabsContainer.indexOf(panelId)===index)return;this._onMove.fire({target:position,groupId:data.groupId,itemId:data.panelId,index})}else this._onDidDrop.fire(new DockviewDidDropEvent({nativeEvent:event,position,panel:panel2,getData:()=>getPanelData(),group:this.groupPanel,api:this._api}))}updateDragAndDropState(){this.tabsContainer.updateDragAndDropState()}dispose(){var _a,_b,_c;super.dispose(),(_a=this.watermark)===null||_a===void 0||_a.element.remove(),(_c=(_b=this.watermark)===null||_b===void 0?void 0:_b.dispose)===null||_c===void 0||_c.call(_b),this.watermark=void 0;for(const panel2 of this.panels)panel2.dispose();this.tabsContainer.dispose(),this.contentContainer.dispose()}}class GridviewPanelApiImpl extends PanelApiImpl{constructor(id,component,panel2){super(id,component),this._onDidConstraintsChangeInternal=new Emitter,this.onDidConstraintsChangeInternal=this._onDidConstraintsChangeInternal.event,this._onDidConstraintsChange=new Emitter,this.onDidConstraintsChange=this._onDidConstraintsChange.event,this._onDidSizeChange=new Emitter,this.onDidSizeChange=this._onDidSizeChange.event,this.addDisposables(this._onDidConstraintsChangeInternal,this._onDidConstraintsChange,this._onDidSizeChange),panel2&&this.initialize(panel2)}setConstraints(value2){this._onDidConstraintsChangeInternal.fire(value2)}setSize(event){this._onDidSizeChange.fire(event)}}class GridviewPanel extends BasePanelView{get priority(){return this._priority}get snap(){return this._snap}get minimumWidth(){return this.__minimumWidth()}get minimumHeight(){return this.__minimumHeight()}get maximumHeight(){return this.__maximumHeight()}get maximumWidth(){return this.__maximumWidth()}__minimumWidth(){const width=typeof this._minimumWidth=="function"?this._minimumWidth():this._minimumWidth;return width!==this._evaluatedMinimumWidth&&(this._evaluatedMinimumWidth=width,this.updateConstraints()),width}__maximumWidth(){const width=typeof this._maximumWidth=="function"?this._maximumWidth():this._maximumWidth;return width!==this._evaluatedMaximumWidth&&(this._evaluatedMaximumWidth=width,this.updateConstraints()),width}__minimumHeight(){const height=typeof this._minimumHeight=="function"?this._minimumHeight():this._minimumHeight;return height!==this._evaluatedMinimumHeight&&(this._evaluatedMinimumHeight=height,this.updateConstraints()),height}__maximumHeight(){const height=typeof this._maximumHeight=="function"?this._maximumHeight():this._maximumHeight;return height!==this._evaluatedMaximumHeight&&(this._evaluatedMaximumHeight=height,this.updateConstraints()),height}get isActive(){return this.api.isActive}get isVisible(){return this.api.isVisible}constructor(id,component,options,api){super(id,component,api??new GridviewPanelApiImpl(id,component)),this._evaluatedMinimumWidth=0,this._evaluatedMaximumWidth=Number.MAX_SAFE_INTEGER,this._evaluatedMinimumHeight=0,this._evaluatedMaximumHeight=Number.MAX_SAFE_INTEGER,this._minimumWidth=0,this._minimumHeight=0,this._maximumWidth=Number.MAX_SAFE_INTEGER,this._maximumHeight=Number.MAX_SAFE_INTEGER,this._snap=!1,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,typeof options?.minimumWidth=="number"&&(this._minimumWidth=options.minimumWidth),typeof options?.maximumWidth=="number"&&(this._maximumWidth=options.maximumWidth),typeof options?.minimumHeight=="number"&&(this._minimumHeight=options.minimumHeight),typeof options?.maximumHeight=="number"&&(this._maximumHeight=options.maximumHeight),this.api.initialize(this),this.addDisposables(this.api.onWillVisibilityChange(event=>{const{isVisible}=event,{accessor}=this._params;accessor.setVisible(this,isVisible)}),this.api.onActiveChange(()=>{const{accessor}=this._params;accessor.doSetGroupActive(this)}),this.api.onDidConstraintsChangeInternal(event=>{(typeof event.minimumWidth=="number"||typeof event.minimumWidth=="function")&&(this._minimumWidth=event.minimumWidth),(typeof event.minimumHeight=="number"||typeof event.minimumHeight=="function")&&(this._minimumHeight=event.minimumHeight),(typeof event.maximumWidth=="number"||typeof event.maximumWidth=="function")&&(this._maximumWidth=event.maximumWidth),(typeof event.maximumHeight=="number"||typeof event.maximumHeight=="function")&&(this._maximumHeight=event.maximumHeight)}),this.api.onDidSizeChange(event=>{this._onDidChange.fire({height:event.height,width:event.width})}),this._onDidChange)}setVisible(isVisible){this.api._onDidVisibilityChange.fire({isVisible})}setActive(isActive){this.api._onDidActiveChange.fire({isActive})}init(parameters){parameters.maximumHeight&&(this._maximumHeight=parameters.maximumHeight),parameters.minimumHeight&&(this._minimumHeight=parameters.minimumHeight),parameters.maximumWidth&&(this._maximumWidth=parameters.maximumWidth),parameters.minimumWidth&&(this._minimumWidth=parameters.minimumWidth),this._priority=parameters.priority,this._snap=!!parameters.snap,super.init(parameters),typeof parameters.isVisible=="boolean"&&this.setVisible(parameters.isVisible)}updateConstraints(){this.api._onDidConstraintsChange.fire({minimumWidth:this._evaluatedMinimumWidth,maximumWidth:this._evaluatedMaximumWidth,minimumHeight:this._evaluatedMinimumHeight,maximumHeight:this._evaluatedMaximumHeight})}toJSON(){const state=super.toJSON(),maximum=value2=>value2===Number.MAX_SAFE_INTEGER?void 0:value2,minimum=value2=>value2<=0?void 0:value2;return Object.assign(Object.assign({},state),{minimumHeight:minimum(this.minimumHeight),maximumHeight:maximum(this.maximumHeight),minimumWidth:minimum(this.minimumWidth),maximumWidth:maximum(this.maximumWidth),snap:this.snap,priority:this.priority})}}const NOT_INITIALIZED_MESSAGE="dockview: DockviewGroupPanelApiImpl not initialized";class DockviewGroupPanelApiImpl extends GridviewPanelApiImpl{get location(){if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);return this._group.model.location}constructor(id,accessor){super(id,"__dockviewgroup__"),this.accessor=accessor,this._onDidLocationChange=new Emitter,this.onDidLocationChange=this._onDidLocationChange.event,this._onDidActivePanelChange=new Emitter,this.onDidActivePanelChange=this._onDidActivePanelChange.event,this.addDisposables(this._onDidLocationChange,this._onDidActivePanelChange,this._onDidVisibilityChange.event(event=>{event.isVisible&&this._pendingSize&&(super.setSize(this._pendingSize),this._pendingSize=void 0)}))}setSize(event){this._pendingSize=Object.assign({},event),super.setSize(event)}close(){if(this._group)return this.accessor.removeGroup(this._group)}getWindow(){return this.location.type==="popout"?this.location.getWindow():window}setHeaderPosition(position){if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);this._group.model.headerPosition=position}getHeaderPosition(){if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);return this._group.model.headerPosition}moveTo(options){var _a,_b,_c,_d;if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);const group=(_a=options.group)!==null&&_a!==void 0?_a:this.accessor.addGroup({direction:positionToDirection((_b=options.position)!==null&&_b!==void 0?_b:"right"),skipSetActive:(_c=options.skipSetActive)!==null&&_c!==void 0?_c:!1});this.accessor.moveGroupOrPanel({from:{groupId:this._group.id},to:{group,position:options.group&&(_d=options.position)!==null&&_d!==void 0?_d:"center",index:options.index},skipSetActive:options.skipSetActive})}maximize(){if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);this.location.type==="grid"&&this.accessor.maximizeGroup(this._group)}isMaximized(){if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);return this.accessor.isMaximizedGroup(this._group)}exitMaximized(){if(!this._group)throw new Error(NOT_INITIALIZED_MESSAGE);this.isMaximized()&&this.accessor.exitMaximizedGroup()}initialize(group){this._group=group}}const MINIMUM_DOCKVIEW_GROUP_PANEL_WIDTH=100,MINIMUM_DOCKVIEW_GROUP_PANEL_HEIGHT=100;class DockviewGroupPanel extends GridviewPanel{get minimumWidth(){var _a;if(typeof this._explicitConstraints.minimumWidth=="number")return this._explicitConstraints.minimumWidth;const activePanelMinimumWidth=(_a=this.activePanel)===null||_a===void 0?void 0:_a.minimumWidth;return typeof activePanelMinimumWidth=="number"?activePanelMinimumWidth:super.__minimumWidth()}get minimumHeight(){var _a;if(typeof this._explicitConstraints.minimumHeight=="number")return this._explicitConstraints.minimumHeight;const activePanelMinimumHeight=(_a=this.activePanel)===null||_a===void 0?void 0:_a.minimumHeight;return typeof activePanelMinimumHeight=="number"?activePanelMinimumHeight:super.__minimumHeight()}get maximumWidth(){var _a;if(typeof this._explicitConstraints.maximumWidth=="number")return this._explicitConstraints.maximumWidth;const activePanelMaximumWidth=(_a=this.activePanel)===null||_a===void 0?void 0:_a.maximumWidth;return typeof activePanelMaximumWidth=="number"?activePanelMaximumWidth:super.__maximumWidth()}get maximumHeight(){var _a;if(typeof this._explicitConstraints.maximumHeight=="number")return this._explicitConstraints.maximumHeight;const activePanelMaximumHeight=(_a=this.activePanel)===null||_a===void 0?void 0:_a.maximumHeight;return typeof activePanelMaximumHeight=="number"?activePanelMaximumHeight:super.__maximumHeight()}get panels(){return this._model.panels}get activePanel(){return this._model.activePanel}get size(){return this._model.size}get model(){return this._model}get locked(){return this._model.locked}set locked(value2){this._model.locked=value2}get header(){return this._model.header}constructor(accessor,id,options){var _a,_b,_c,_d,_e,_f;super(id,"groupview_default",{minimumHeight:(_b=(_a=options.constraints)===null||_a===void 0?void 0:_a.minimumHeight)!==null&&_b!==void 0?_b:MINIMUM_DOCKVIEW_GROUP_PANEL_HEIGHT,minimumWidth:(_d=(_c=options.constraints)===null||_c===void 0?void 0:_c.minimumWidth)!==null&&_d!==void 0?_d:MINIMUM_DOCKVIEW_GROUP_PANEL_WIDTH,maximumHeight:(_e=options.constraints)===null||_e===void 0?void 0:_e.maximumHeight,maximumWidth:(_f=options.constraints)===null||_f===void 0?void 0:_f.maximumWidth},new DockviewGroupPanelApiImpl(id,accessor)),this._explicitConstraints={},this.api.initialize(this),this._model=new DockviewGroupPanelModel(this.element,accessor,id,options,this),this.addDisposables(this.model.onDidActivePanelChange(event=>{this.api._onDidActivePanelChange.fire(event)}),this.api.onDidConstraintsChangeInternal(event=>{event.minimumWidth!==void 0&&(this._explicitConstraints.minimumWidth=typeof event.minimumWidth=="function"?event.minimumWidth():event.minimumWidth),event.minimumHeight!==void 0&&(this._explicitConstraints.minimumHeight=typeof event.minimumHeight=="function"?event.minimumHeight():event.minimumHeight),event.maximumWidth!==void 0&&(this._explicitConstraints.maximumWidth=typeof event.maximumWidth=="function"?event.maximumWidth():event.maximumWidth),event.maximumHeight!==void 0&&(this._explicitConstraints.maximumHeight=typeof event.maximumHeight=="function"?event.maximumHeight():event.maximumHeight)}))}focus(){this.api.isActive||this.api.setActive(),super.focus()}initialize(){this._model.initialize()}setActive(isActive){super.setActive(isActive),this.model.setActive(isActive)}layout(width,height){super.layout(width,height),this.model.layout(width,height)}getComponent(){return this._model}toJSON(){return this.model.toJSON()}}const themeAbyss={className:"dockview-theme-abyss"};class DockviewPanelApiImpl extends GridviewPanelApiImpl{get location(){return this.group.api.location}get title(){return this.panel.title}get isGroupActive(){return this.group.isActive}get renderer(){return this.panel.renderer}set group(value2){const oldGroup=this._group;this._group!==value2&&(this._group=value2,this._onDidGroupChange.fire({}),this.setupGroupEventListeners(oldGroup),this._onDidLocationChange.fire({location:this.group.api.location}))}get group(){return this._group}get tabComponent(){return this._tabComponent}constructor(panel2,group,accessor,component,tabComponent){super(panel2.id,component),this.panel=panel2,this.accessor=accessor,this._onDidTitleChange=new Emitter,this.onDidTitleChange=this._onDidTitleChange.event,this._onDidActiveGroupChange=new Emitter,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._onDidGroupChange=new Emitter,this.onDidGroupChange=this._onDidGroupChange.event,this._onDidRendererChange=new Emitter,this.onDidRendererChange=this._onDidRendererChange.event,this._onDidLocationChange=new Emitter,this.onDidLocationChange=this._onDidLocationChange.event,this.groupEventsDisposable=new MutableDisposable,this._tabComponent=tabComponent,this.initialize(panel2),this._group=group,this.setupGroupEventListeners(),this.addDisposables(this.groupEventsDisposable,this._onDidRendererChange,this._onDidTitleChange,this._onDidGroupChange,this._onDidActiveGroupChange,this._onDidLocationChange)}getWindow(){return this.group.api.getWindow()}moveTo(options){var _a,_b;this.accessor.moveGroupOrPanel({from:{groupId:this._group.id,panelId:this.panel.id},to:{group:(_a=options.group)!==null&&_a!==void 0?_a:this._group,position:options.group&&(_b=options.position)!==null&&_b!==void 0?_b:"center",index:options.index},skipSetActive:options.skipSetActive})}setTitle(title){this.panel.setTitle(title)}setRenderer(renderer){this.panel.setRenderer(renderer)}close(){this.group.model.closePanel(this.panel)}maximize(){this.group.api.maximize()}isMaximized(){return this.group.api.isMaximized()}exitMaximized(){this.group.api.exitMaximized()}setupGroupEventListeners(previousGroup){var _a;let _trackGroupActive=(_a=previousGroup?.isActive)!==null&&_a!==void 0?_a:!1;this.groupEventsDisposable.value=new CompositeDisposable(this.group.api.onDidVisibilityChange(event=>{const hasBecomeHidden=!event.isVisible&&this.isVisible,hasBecomeVisible=event.isVisible&&!this.isVisible,isActivePanel=this.group.model.isPanelActive(this.panel);(hasBecomeHidden||hasBecomeVisible&&isActivePanel)&&this._onDidVisibilityChange.fire(event)}),this.group.api.onDidLocationChange(event=>{this.group===this.panel.group&&this._onDidLocationChange.fire(event)}),this.group.api.onDidActiveChange(()=>{this.group===this.panel.group&&_trackGroupActive!==this.isGroupActive&&(_trackGroupActive=this.isGroupActive,this._onDidActiveGroupChange.fire({isActive:this.isGroupActive}))}))}}class DockviewPanel extends CompositeDisposable{get params(){return this._params}get title(){return this._title}get group(){return this._group}get renderer(){var _a;return(_a=this._renderer)!==null&&_a!==void 0?_a:this.accessor.renderer}get minimumWidth(){return this._minimumWidth}get minimumHeight(){return this._minimumHeight}get maximumWidth(){return this._maximumWidth}get maximumHeight(){return this._maximumHeight}constructor(id,component,tabComponent,accessor,containerApi,group,view,options){super(),this.id=id,this.accessor=accessor,this.containerApi=containerApi,this.view=view,this._renderer=options.renderer,this._group=group,this._minimumWidth=options.minimumWidth,this._minimumHeight=options.minimumHeight,this._maximumWidth=options.maximumWidth,this._maximumHeight=options.maximumHeight,this.api=new DockviewPanelApiImpl(this,this._group,accessor,component,tabComponent),this.addDisposables(this.api.onActiveChange(()=>{accessor.setActivePanel(this)}),this.api.onDidSizeChange(event=>{this.group.api.setSize(event)}),this.api.onDidRendererChange(()=>{this.group.model.rerender(this)}))}init(params){this._params=params.params,this.view.init(Object.assign(Object.assign({},params),{api:this.api,containerApi:this.containerApi})),this.setTitle(params.title)}focus(){const event=new WillFocusEvent;this.api._onWillFocus.fire(event),!event.defaultPrevented&&(this.api.isActive||this.api.setActive())}toJSON(){return{id:this.id,contentComponent:this.view.contentComponent,tabComponent:this.view.tabComponent,params:Object.keys(this._params||{}).length>0?this._params:void 0,title:this.title,renderer:this._renderer,minimumHeight:this._minimumHeight,maximumHeight:this._maximumHeight,minimumWidth:this._minimumWidth,maximumWidth:this._maximumWidth}}setTitle(title){title!==this.title&&(this._title=title,this.api._onDidTitleChange.fire({title}))}setRenderer(renderer){renderer!==this.renderer&&(this._renderer=renderer,this.api._onDidRendererChange.fire({renderer}))}update(event){var _a;this._params=Object.assign(Object.assign({},(_a=this._params)!==null&&_a!==void 0?_a:{}),event.params);for(const key of Object.keys(event.params))event.params[key]===void 0&&delete this._params[key];this.view.update({params:this._params})}updateFromStateModel(state){var _a,_b,_c;this._maximumHeight=state.maximumHeight,this._minimumHeight=state.minimumHeight,this._maximumWidth=state.maximumWidth,this._minimumWidth=state.minimumWidth,this.update({params:(_a=state.params)!==null&&_a!==void 0?_a:{}}),this.setTitle((_b=state.title)!==null&&_b!==void 0?_b:this.id),this.setRenderer((_c=state.renderer)!==null&&_c!==void 0?_c:this.accessor.renderer)}updateParentGroup(group,options){this._group=group,this.api.group=this._group;const isPanelVisible=this._group.model.isPanelActive(this),isActive=this.group.api.isActive&&isPanelVisible;options?.skipSetActive||this.api.isActive!==isActive&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&isPanelVisible}),this.api.isVisible!==isPanelVisible&&this.api._onDidVisibilityChange.fire({isVisible:isPanelVisible})}runEvents(){const isPanelVisible=this._group.model.isPanelActive(this),isActive=this.group.api.isActive&&isPanelVisible;this.api.isActive!==isActive&&this.api._onDidActiveChange.fire({isActive:this.group.api.isActive&&isPanelVisible}),this.api.isVisible!==isPanelVisible&&this.api._onDidVisibilityChange.fire({isVisible:isPanelVisible})}layout(width,height){this.api._onDidDimensionChange.fire({width,height}),this.view.layout(width,height)}dispose(){this.api.dispose(),this.view.dispose()}}class DefaultTab extends CompositeDisposable{get element(){return this._element}constructor(){super(),this._element=document.createElement("div"),this._element.className="dv-default-tab",this._content=document.createElement("div"),this._content.className="dv-default-tab-content",this.action=document.createElement("div"),this.action.className="dv-default-tab-action",this.action.appendChild(createCloseButton()),this._element.appendChild(this._content),this._element.appendChild(this.action),this.render()}init(params){this._title=params.title,this.addDisposables(params.api.onDidTitleChange(event=>{this._title=event.title,this.render()}),addDisposableListener(this.action,"pointerdown",ev=>{ev.preventDefault()}),addDisposableListener(this.action,"click",ev=>{ev.defaultPrevented||(ev.preventDefault(),params.api.close())})),this.render()}render(){var _a;this._content.textContent!==this._title&&(this._content.textContent=(_a=this._title)!==null&&_a!==void 0?_a:"")}}class DockviewPanelModel{get content(){return this._content}get tab(){return this._tab}constructor(accessor,id,contentComponent,tabComponent){this.accessor=accessor,this.id=id,this.contentComponent=contentComponent,this.tabComponent=tabComponent,this._content=this.createContentComponent(this.id,contentComponent),this._tab=this.createTabComponent(this.id,tabComponent)}createTabRenderer(tabLocation){var _a;const cmp=this.createTabComponent(this.id,this.tabComponent);return this._params&&cmp.init(Object.assign(Object.assign({},this._params),{tabLocation})),this._updateEvent&&((_a=cmp.update)===null||_a===void 0||_a.call(cmp,this._updateEvent)),cmp}init(params){this._params=params,this.content.init(params),this.tab.init(Object.assign(Object.assign({},params),{tabLocation:"header"}))}layout(width,height){var _a,_b;(_b=(_a=this.content).layout)===null||_b===void 0||_b.call(_a,width,height)}update(event){var _a,_b,_c,_d;this._updateEvent=event,(_b=(_a=this.content).update)===null||_b===void 0||_b.call(_a,event),(_d=(_c=this.tab).update)===null||_d===void 0||_d.call(_c,event)}dispose(){var _a,_b,_c,_d;(_b=(_a=this.content).dispose)===null||_b===void 0||_b.call(_a),(_d=(_c=this.tab).dispose)===null||_d===void 0||_d.call(_c)}createContentComponent(id,componentName){return this.accessor.options.createComponent({id,name:componentName})}createTabComponent(id,componentName){const name=componentName??this.accessor.options.defaultTabComponent;if(name){if(this.accessor.options.createTabComponent){const component=this.accessor.options.createTabComponent({id,name});return component||new DefaultTab}console.warn(`dockview: tabComponent '${componentName}' was not found. falling back to the default tab.`)}return new DefaultTab}}class DefaultDockviewDeserialzier{constructor(accessor){this.accessor=accessor}fromJSON(panelData,group){var _a,_b;const panelId=panelData.id,params=panelData.params,title=panelData.title,viewData=panelData.view,contentComponent=viewData?viewData.content.id:(_a=panelData.contentComponent)!==null&&_a!==void 0?_a:"unknown",tabComponent=viewData?(_b=viewData.tab)===null||_b===void 0?void 0:_b.id:panelData.tabComponent,view=new DockviewPanelModel(this.accessor,panelId,contentComponent,tabComponent),panel2=new DockviewPanel(panelId,contentComponent,tabComponent,this.accessor,new DockviewApi(this.accessor),group,view,{renderer:panelData.renderer,minimumWidth:panelData.minimumWidth,minimumHeight:panelData.minimumHeight,maximumWidth:panelData.maximumWidth,maximumHeight:panelData.maximumHeight});return panel2.init({title:title??panelId,params:params??{}}),panel2}}class Watermark extends CompositeDisposable{get element(){return this._element}constructor(){super(),this._element=document.createElement("div"),this._element.className="dv-watermark"}init(_params){}}class AriaLevelTracker{constructor(){this._orderedList=[]}push(element){this._orderedList=[...this._orderedList.filter(item=>item!==element),element],this.update()}destroy(element){this._orderedList=this._orderedList.filter(item=>item!==element),this.update()}update(){for(let i=0;i<this._orderedList.length;i++)this._orderedList[i].setAttribute("aria-level",`${i}`),this._orderedList[i].style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${i*2})`}}const arialLevelTracker=new AriaLevelTracker;class Overlay extends CompositeDisposable{set minimumInViewportWidth(value2){this.options.minimumInViewportWidth=value2}set minimumInViewportHeight(value2){this.options.minimumInViewportHeight=value2}get element(){return this._element}get isVisible(){return this._isVisible}constructor(options){super(),this.options=options,this._element=document.createElement("div"),this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this._onDidChangeEnd=new Emitter,this.onDidChangeEnd=this._onDidChangeEnd.event,this.addDisposables(this._onDidChange,this._onDidChangeEnd),this._element.className="dv-resize-container",this._isVisible=!0,this.setupResize("top"),this.setupResize("bottom"),this.setupResize("left"),this.setupResize("right"),this.setupResize("topleft"),this.setupResize("topright"),this.setupResize("bottomleft"),this.setupResize("bottomright"),this._element.appendChild(this.options.content),this.options.container.appendChild(this._element),this.setBounds(Object.assign(Object.assign(Object.assign(Object.assign({height:this.options.height,width:this.options.width},"top"in this.options&&{top:this.options.top}),"bottom"in this.options&&{bottom:this.options.bottom}),"left"in this.options&&{left:this.options.left}),"right"in this.options&&{right:this.options.right})),arialLevelTracker.push(this._element)}setVisible(isVisible){isVisible!==this.isVisible&&(this._isVisible=isVisible,toggleClass(this.element,"dv-hidden",!this.isVisible))}bringToFront(){arialLevelTracker.push(this._element)}setBounds(bounds={}){typeof bounds.height=="number"&&(this._element.style.height=`${bounds.height}px`),typeof bounds.width=="number"&&(this._element.style.width=`${bounds.width}px`),"top"in bounds&&typeof bounds.top=="number"&&(this._element.style.top=`${bounds.top}px`,this._element.style.bottom="auto",this.verticalAlignment="top"),"bottom"in bounds&&typeof bounds.bottom=="number"&&(this._element.style.bottom=`${bounds.bottom}px`,this._element.style.top="auto",this.verticalAlignment="bottom"),"left"in bounds&&typeof bounds.left=="number"&&(this._element.style.left=`${bounds.left}px`,this._element.style.right="auto",this.horiziontalAlignment="left"),"right"in bounds&&typeof bounds.right=="number"&&(this._element.style.right=`${bounds.right}px`,this._element.style.left="auto",this.horiziontalAlignment="right");const containerRect=this.options.container.getBoundingClientRect(),overlayRect=this._element.getBoundingClientRect(),xOffset=Math.max(0,this.getMinimumWidth(overlayRect.width)),yOffset=Math.max(0,this.getMinimumHeight(overlayRect.height));if(this.verticalAlignment==="top"){const top=clamp(overlayRect.top-containerRect.top,-yOffset,Math.max(0,containerRect.height-overlayRect.height+yOffset));this._element.style.top=`${top}px`,this._element.style.bottom="auto"}if(this.verticalAlignment==="bottom"){const bottom=clamp(containerRect.bottom-overlayRect.bottom,-yOffset,Math.max(0,containerRect.height-overlayRect.height+yOffset));this._element.style.bottom=`${bottom}px`,this._element.style.top="auto"}if(this.horiziontalAlignment==="left"){const left=clamp(overlayRect.left-containerRect.left,-xOffset,Math.max(0,containerRect.width-overlayRect.width+xOffset));this._element.style.left=`${left}px`,this._element.style.right="auto"}if(this.horiziontalAlignment==="right"){const right=clamp(containerRect.right-overlayRect.right,-xOffset,Math.max(0,containerRect.width-overlayRect.width+xOffset));this._element.style.right=`${right}px`,this._element.style.left="auto"}this._onDidChange.fire()}toJSON(){const container2=this.options.container.getBoundingClientRect(),element=this._element.getBoundingClientRect(),result={};return this.verticalAlignment==="top"?result.top=parseFloat(this._element.style.top):this.verticalAlignment==="bottom"?result.bottom=parseFloat(this._element.style.bottom):result.top=element.top-container2.top,this.horiziontalAlignment==="left"?result.left=parseFloat(this._element.style.left):this.horiziontalAlignment==="right"?result.right=parseFloat(this._element.style.right):result.left=element.left-container2.left,result.width=element.width,result.height=element.height,result}setupDrag(dragTarget,options={inDragMode:!1}){const move=new MutableDisposable,track=()=>{let offset=null;const iframes=disableIframePointEvents();move.value=new CompositeDisposable({dispose:()=>{iframes.release()}},addDisposableListener(window,"pointermove",e=>{const containerRect=this.options.container.getBoundingClientRect(),x=e.clientX-containerRect.left,y=e.clientY-containerRect.top;toggleClass(this._element,"dv-resize-container-dragging",!0);const overlayRect=this._element.getBoundingClientRect();offset===null&&(offset={x:e.clientX-overlayRect.left,y:e.clientY-overlayRect.top});const xOffset=Math.max(0,this.getMinimumWidth(overlayRect.width)),yOffset=Math.max(0,this.getMinimumHeight(overlayRect.height)),top=clamp(y-offset.y,-yOffset,Math.max(0,containerRect.height-overlayRect.height+yOffset)),bottom=clamp(offset.y-y+containerRect.height-overlayRect.height,-yOffset,Math.max(0,containerRect.height-overlayRect.height+yOffset)),left=clamp(x-offset.x,-xOffset,Math.max(0,containerRect.width-overlayRect.width+xOffset)),right=clamp(offset.x-x+containerRect.width-overlayRect.width,-xOffset,Math.max(0,containerRect.width-overlayRect.width+xOffset)),bounds={};top<=bottom?bounds.top=top:bounds.bottom=bottom,left<=right?bounds.left=left:bounds.right=right,this.setBounds(bounds)}),addDisposableListener(window,"pointerup",()=>{toggleClass(this._element,"dv-resize-container-dragging",!1),move.dispose(),this._onDidChangeEnd.fire()}))};this.addDisposables(move,addDisposableListener(dragTarget,"pointerdown",event=>{if(event.defaultPrevented){event.preventDefault();return}quasiDefaultPrevented(event)||track()}),addDisposableListener(this.options.content,"pointerdown",event=>{event.defaultPrevented||quasiDefaultPrevented(event)||event.shiftKey&&track()}),addDisposableListener(this.options.content,"pointerdown",()=>{arialLevelTracker.push(this._element)},!0)),options.inDragMode&&track()}setupResize(direction){const resizeHandleElement=document.createElement("div");resizeHandleElement.className=`dv-resize-handle-${direction}`,this._element.appendChild(resizeHandleElement);const move=new MutableDisposable;this.addDisposables(move,addDisposableListener(resizeHandleElement,"pointerdown",e=>{e.preventDefault();let startPosition=null;const iframes=disableIframePointEvents();move.value=new CompositeDisposable(addDisposableListener(window,"pointermove",e2=>{const containerRect=this.options.container.getBoundingClientRect(),overlayRect=this._element.getBoundingClientRect(),y=e2.clientY-containerRect.top,x=e2.clientX-containerRect.left;startPosition===null&&(startPosition={originalY:y,originalHeight:overlayRect.height,originalX:x,originalWidth:overlayRect.width});let top,bottom,height,left,right,width;const moveTop=()=>{const maxTop=startPosition.originalY+startPosition.originalHeight>containerRect.height?Math.max(0,containerRect.height-Overlay.MINIMUM_HEIGHT):Math.max(0,startPosition.originalY+startPosition.originalHeight-Overlay.MINIMUM_HEIGHT);top=clamp(y,0,maxTop),height=startPosition.originalY+startPosition.originalHeight-top,bottom=containerRect.height-top-height},moveBottom=()=>{top=startPosition.originalY-startPosition.originalHeight;const minHeight=top<0&&typeof this.options.minimumInViewportHeight=="number"?-top+this.options.minimumInViewportHeight:Overlay.MINIMUM_HEIGHT,maxHeight=containerRect.height-Math.max(0,top);height=clamp(y-top,minHeight,maxHeight),bottom=containerRect.height-top-height},moveLeft=()=>{const maxLeft=startPosition.originalX+startPosition.originalWidth>containerRect.width?Math.max(0,containerRect.width-Overlay.MINIMUM_WIDTH):Math.max(0,startPosition.originalX+startPosition.originalWidth-Overlay.MINIMUM_WIDTH);left=clamp(x,0,maxLeft),width=startPosition.originalX+startPosition.originalWidth-left,right=containerRect.width-left-width},moveRight=()=>{left=startPosition.originalX-startPosition.originalWidth;const minWidth=left<0&&typeof this.options.minimumInViewportWidth=="number"?-left+this.options.minimumInViewportWidth:Overlay.MINIMUM_WIDTH,maxWidth=containerRect.width-Math.max(0,left);width=clamp(x-left,minWidth,maxWidth),right=containerRect.width-left-width};switch(direction){case"top":moveTop();break;case"bottom":moveBottom();break;case"left":moveLeft();break;case"right":moveRight();break;case"topleft":moveTop(),moveLeft();break;case"topright":moveTop(),moveRight();break;case"bottomleft":moveBottom(),moveLeft();break;case"bottomright":moveBottom(),moveRight();break}const bounds={};top<=bottom?bounds.top=top:bounds.bottom=bottom,left<=right?bounds.left=left:bounds.right=right,bounds.height=height,bounds.width=width,this.setBounds(bounds)}),{dispose:()=>{iframes.release()}},addDisposableListener(window,"pointerup",()=>{move.dispose(),this._onDidChangeEnd.fire()}))}))}getMinimumWidth(width){return typeof this.options.minimumInViewportWidth=="number"?width-this.options.minimumInViewportWidth:0}getMinimumHeight(height){return typeof this.options.minimumInViewportHeight=="number"?height-this.options.minimumInViewportHeight:0}dispose(){arialLevelTracker.destroy(this._element),this._element.remove(),super.dispose()}}Overlay.MINIMUM_HEIGHT=20;Overlay.MINIMUM_WIDTH=20;class DockviewFloatingGroupPanel extends CompositeDisposable{constructor(group,overlay){super(),this.group=group,this.overlay=overlay,this.addDisposables(overlay)}position(bounds){this.overlay.setBounds(bounds)}}const DEFAULT_FLOATING_GROUP_OVERFLOW_SIZE=100,DEFAULT_FLOATING_GROUP_POSITION={left:100,top:100,width:300,height:300},DESERIALIZATION_POPOUT_DELAY_MS=100;class PositionCache{constructor(){this.cache=new Map,this.currentFrameId=0,this.rafId=null}getPosition(element){const cached=this.cache.get(element);if(cached&&cached.frameId===this.currentFrameId)return cached.rect;this.scheduleFrameUpdate();const rect=getDomNodePagePosition(element);return this.cache.set(element,{rect,frameId:this.currentFrameId}),rect}invalidate(){this.currentFrameId++}scheduleFrameUpdate(){this.rafId||(this.rafId=requestAnimationFrame(()=>{this.currentFrameId++,this.rafId=null}))}}function createFocusableElement(){const element=document.createElement("div");return element.tabIndex=-1,element}class OverlayRenderContainer extends CompositeDisposable{constructor(element,accessor){super(),this.element=element,this.accessor=accessor,this.map={},this._disposed=!1,this.positionCache=new PositionCache,this.pendingUpdates=new Set,this.addDisposables(Disposable.from(()=>{for(const value2 of Object.values(this.map))value2.disposable.dispose(),value2.destroy.dispose();this._disposed=!0}))}updateAllPositions(){if(!this._disposed){this.positionCache.invalidate();for(const entry of Object.values(this.map))entry.panel.api.isVisible&&entry.resize&&entry.resize()}}detatch(panel2){if(this.map[panel2.api.id]){const{disposable,destroy}=this.map[panel2.api.id];return disposable.dispose(),destroy.dispose(),delete this.map[panel2.api.id],!0}return!1}attach(options){const{panel:panel2,referenceContainer}=options;if(!this.map[panel2.api.id]){const element=createFocusableElement();element.className="dv-render-overlay",element.style.visibility="hidden",this.map[panel2.api.id]={panel:panel2,disposable:Disposable.NONE,destroy:Disposable.NONE,element}}const focusContainer=this.map[panel2.api.id].element;panel2.view.content.element.parentElement!==focusContainer&&focusContainer.appendChild(panel2.view.content.element),focusContainer.parentElement!==this.element&&this.element.appendChild(focusContainer);const resize=()=>{const panelId=panel2.api.id;this.pendingUpdates.has(panelId)||(this.pendingUpdates.add(panelId),requestAnimationFrame(()=>{if(this.pendingUpdates.delete(panelId),this.isDisposed||!this.map[panelId])return;const box=this.positionCache.getPosition(referenceContainer.element),box2=this.positionCache.getPosition(this.element),left=box.left-box2.left,top=box.top-box2.top,width=box.width,height=box.height;focusContainer.style.left=`${left}px`,focusContainer.style.top=`${top}px`,focusContainer.style.width=`${width}px`,focusContainer.style.height=`${height}px`,focusContainer.style.visibility==="hidden"&&(focusContainer.style.visibility=""),toggleClass(focusContainer,"dv-render-overlay-float",panel2.group.api.location.type==="floating")}))},visibilityChanged=()=>{panel2.api.isVisible&&(this.positionCache.invalidate(),resize()),focusContainer.style.display=panel2.api.isVisible?"":"none"},observerDisposable=new MutableDisposable,correctLayerPosition=()=>{panel2.api.location.type==="floating"?queueMicrotask(()=>{const floatingGroup=this.accessor.floatingGroups.find(group=>group.group===panel2.api.group);if(!floatingGroup)return;const element=floatingGroup.overlay.element,update=()=>{const level=Number(element.getAttribute("aria-level"));focusContainer.style.zIndex=`calc(var(--dv-overlay-z-index, 999) + ${level*2+1})`},observer=new MutationObserver(()=>{update()});observerDisposable.value=Disposable.from(()=>observer.disconnect()),observer.observe(element,{attributeFilter:["aria-level"],attributes:!0}),update()}):focusContainer.style.zIndex=""},disposable=new CompositeDisposable(observerDisposable,new DragAndDropObserver(focusContainer,{onDragEnd:e=>{referenceContainer.dropTarget.dnd.onDragEnd(e)},onDragEnter:e=>{referenceContainer.dropTarget.dnd.onDragEnter(e)},onDragLeave:e=>{referenceContainer.dropTarget.dnd.onDragLeave(e)},onDrop:e=>{referenceContainer.dropTarget.dnd.onDrop(e)},onDragOver:e=>{referenceContainer.dropTarget.dnd.onDragOver(e)}}),panel2.api.onDidVisibilityChange(()=>{visibilityChanged()}),panel2.api.onDidDimensionsChange(()=>{panel2.api.isVisible&&resize()}),panel2.api.onDidLocationChange(()=>{correctLayerPosition()}));return this.map[panel2.api.id].destroy=Disposable.from(()=>{var _a;panel2.view.content.element.parentElement===focusContainer&&focusContainer.removeChild(panel2.view.content.element),(_a=focusContainer.parentElement)===null||_a===void 0||_a.removeChild(focusContainer)}),correctLayerPosition(),queueMicrotask(()=>{this.isDisposed||visibilityChanged()}),this.map[panel2.api.id].disposable.dispose(),this.map[panel2.api.id].disposable=disposable,this.map[panel2.api.id].resize=resize,focusContainer}}function __awaiter(thisArg,_arguments,P,generator){function adopt(value2){return value2 instanceof P?value2:new P(function(resolve){resolve(value2)})}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value2){try{step(generator.next(value2))}catch(e){reject(e)}}function rejected(value2){try{step(generator.throw(value2))}catch(e){reject(e)}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected)}step((generator=generator.apply(thisArg,[])).next())})}class PopoutWindow extends CompositeDisposable{get window(){var _a,_b;return(_b=(_a=this._window)===null||_a===void 0?void 0:_a.value)!==null&&_b!==void 0?_b:null}constructor(target,className,options){super(),this.target=target,this.className=className,this.options=options,this._onWillClose=new Emitter,this.onWillClose=this._onWillClose.event,this._onDidClose=new Emitter,this.onDidClose=this._onDidClose.event,this._window=null,this.addDisposables(this._onWillClose,this._onDidClose,{dispose:()=>{this.close()}})}dimensions(){if(!this._window)return null;const left=this._window.value.screenX,top=this._window.value.screenY,width=this._window.value.innerWidth,height=this._window.value.innerHeight;return{top,left,width,height}}close(){var _a,_b;this._window&&(this._onWillClose.fire(),(_b=(_a=this.options).onWillClose)===null||_b===void 0||_b.call(_a,{id:this.target,window:this._window.value}),this._window.disposable.dispose(),this._window=null,this._onDidClose.fire())}open(){var _a,_b;return __awaiter(this,void 0,void 0,function*(){if(this._window)throw new Error("instance of popout window is already open");const url=`${this.options.url}`,features=Object.entries({top:this.options.top,left:this.options.left,width:this.options.width,height:this.options.height}).map(([key,value2])=>`${key}=${value2}`).join(","),externalWindow=window.open(url,this.target,features);if(!externalWindow)return null;const disposable=new CompositeDisposable;this._window={value:externalWindow,disposable},disposable.addDisposables(Disposable.from(()=>{externalWindow.close()}),addDisposableListener(window,"beforeunload",()=>{this.close()}));const container2=this.createPopoutWindowContainer();return this.className&&container2.classList.add(this.className),(_b=(_a=this.options).onDidOpen)===null||_b===void 0||_b.call(_a,{id:this.target,window:externalWindow}),new Promise((resolve,reject)=>{externalWindow.addEventListener("unload",e=>{}),externalWindow.addEventListener("load",()=>{try{const externalDocument=externalWindow.document;externalDocument.title=document.title,externalDocument.body.appendChild(container2),addStyles(externalDocument,window.document.styleSheets),addDisposableListener(externalWindow,"beforeunload",()=>{this.close()}),resolve(container2)}catch(err){reject(err)}})})})}createPopoutWindowContainer(){const el=document.createElement("div");return el.classList.add("dv-popout-window"),el.id="dv-popout-window",el.style.position="absolute",el.style.width="100%",el.style.height="100%",el.style.top="0px",el.style.left="0px",el}}class StrictEventsSequencing extends CompositeDisposable{constructor(accessor){super(),this.accessor=accessor,this.init()}init(){const panels=new Set,groups=new Set;this.addDisposables(this.accessor.onDidAddPanel(panel2=>{if(panels.has(panel2.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddPanel] called for panel ${panel2.api.id} but panel already exists`);panels.add(panel2.api.id)}),this.accessor.onDidRemovePanel(panel2=>{if(panels.has(panel2.api.id))panels.delete(panel2.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemovePanel] called for panel ${panel2.api.id} but panel does not exists`)}),this.accessor.onDidAddGroup(group=>{if(groups.has(group.api.id))throw new Error(`dockview: Invalid event sequence. [onDidAddGroup] called for group ${group.api.id} but group already exists`);groups.add(group.api.id)}),this.accessor.onDidRemoveGroup(group=>{if(groups.has(group.api.id))groups.delete(group.api.id);else throw new Error(`dockview: Invalid event sequence. [onDidRemoveGroup] called for group ${group.api.id} but group does not exists`)}))}}class PopupService extends CompositeDisposable{constructor(root){super(),this.root=root,this._active=null,this._activeDisposable=new MutableDisposable,this._element=document.createElement("div"),this._element.className="dv-popover-anchor",this._element.style.position="relative",this.root.prepend(this._element),this.addDisposables(Disposable.from(()=>{this.close()}),this._activeDisposable)}openPopover(element,position){var _a;this.close();const wrapper=document.createElement("div");wrapper.style.position="absolute",wrapper.style.zIndex=(_a=position.zIndex)!==null&&_a!==void 0?_a:"var(--dv-overlay-z-index)",wrapper.appendChild(element);const anchorBox=this._element.getBoundingClientRect(),offsetX=anchorBox.left,offsetY=anchorBox.top;wrapper.style.top=`${position.y-offsetY}px`,wrapper.style.left=`${position.x-offsetX}px`,this._element.appendChild(wrapper),this._active=wrapper,this._activeDisposable.value=new CompositeDisposable(addDisposableListener(window,"pointerdown",event=>{var _a2;const target=event.target;if(!(target instanceof HTMLElement))return;let el=target;for(;el&&el!==wrapper;)el=(_a2=el?.parentElement)!==null&&_a2!==void 0?_a2:null;el||this.close()}),addDisposableListener(window,"resize",()=>{this.close()})),requestAnimationFrame(()=>{shiftAbsoluteElementIntoView(wrapper,this.root)})}close(){this._active&&(this._active.remove(),this._activeDisposable.dispose(),this._active=null)}}class DropTargetAnchorContainer extends CompositeDisposable{get disabled(){return this._disabled}set disabled(value2){var _a;this.disabled!==value2&&(this._disabled=value2,value2&&((_a=this.model)===null||_a===void 0||_a.clear()))}get model(){if(!this.disabled)return{clear:()=>{var _a;this._model&&((_a=this._model.root.parentElement)===null||_a===void 0||_a.removeChild(this._model.root)),this._model=void 0},exists:()=>!!this._model,getElements:(event,outline)=>{const changed=this._outline!==outline;if(this._outline=outline,this._model)return this._model.changed=changed,this._model;const container2=this.createContainer(),anchor=this.createAnchor();if(this._model={root:container2,overlay:anchor,changed},container2.appendChild(anchor),this.element.appendChild(container2),event?.target instanceof HTMLElement){const targetBox=event.target.getBoundingClientRect(),box=this.element.getBoundingClientRect();anchor.style.left=`${targetBox.left-box.left}px`,anchor.style.top=`${targetBox.top-box.top}px`}return this._model}}}constructor(element,options){super(),this.element=element,this._disabled=!1,this._disabled=options.disabled,this.addDisposables(Disposable.from(()=>{var _a;(_a=this.model)===null||_a===void 0||_a.clear()}))}createContainer(){const el=document.createElement("div");return el.className="dv-drop-target-container",el}createAnchor(){const el=document.createElement("div");return el.className="dv-drop-target-anchor",el.style.visibility="hidden",el}}const DEFAULT_ROOT_OVERLAY_MODEL={activationSize:{type:"pixels",value:10},size:{type:"pixels",value:20}};function moveGroupWithoutDestroying(options){const activePanel=options.from.activePanel;[...options.from.panels].map(panel2=>{const removedPanel=options.from.model.removePanel(panel2);return options.from.model.renderContainer.detatch(panel2),removedPanel}).forEach(panel2=>{options.to.model.openPanel(panel2,{skipSetActive:activePanel!==panel2,skipSetGroupActive:!0})})}class DockviewComponent extends BaseGrid{get orientation(){return this.gridview.orientation}get totalPanels(){return this.panels.length}get panels(){return this.groups.flatMap(group=>group.panels)}get options(){return this._options}get activePanel(){const activeGroup=this.activeGroup;if(activeGroup)return activeGroup.activePanel}get renderer(){var _a;return(_a=this.options.defaultRenderer)!==null&&_a!==void 0?_a:"onlyWhenVisible"}get defaultHeaderPosition(){var _a;return(_a=this.options.defaultHeaderPosition)!==null&&_a!==void 0?_a:"top"}get api(){return this._api}get floatingGroups(){return this._floatingGroups}get popoutRestorationPromise(){return this._popoutRestorationPromise}constructor(container2,options){var _a,_b,_c;super(container2,{proportionalLayout:!0,orientation:Orientation.HORIZONTAL,styles:options.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:options.disableAutoResizing,locked:options.locked,margin:(_b=(_a=options.theme)===null||_a===void 0?void 0:_a.gap)!==null&&_b!==void 0?_b:0,className:options.className}),this.nextGroupId=sequentialNumberGenerator(),this._deserializer=new DefaultDockviewDeserialzier(this),this._watermark=null,this._onWillDragPanel=new Emitter,this.onWillDragPanel=this._onWillDragPanel.event,this._onWillDragGroup=new Emitter,this.onWillDragGroup=this._onWillDragGroup.event,this._onDidDrop=new Emitter,this.onDidDrop=this._onDidDrop.event,this._onWillDrop=new Emitter,this.onWillDrop=this._onWillDrop.event,this._onWillShowOverlay=new Emitter,this.onWillShowOverlay=this._onWillShowOverlay.event,this._onUnhandledDragOverEvent=new Emitter,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,this._onDidRemovePanel=new Emitter,this.onDidRemovePanel=this._onDidRemovePanel.event,this._onDidAddPanel=new Emitter,this.onDidAddPanel=this._onDidAddPanel.event,this._onDidPopoutGroupSizeChange=new Emitter,this.onDidPopoutGroupSizeChange=this._onDidPopoutGroupSizeChange.event,this._onDidPopoutGroupPositionChange=new Emitter,this.onDidPopoutGroupPositionChange=this._onDidPopoutGroupPositionChange.event,this._onDidOpenPopoutWindowFail=new Emitter,this.onDidOpenPopoutWindowFail=this._onDidOpenPopoutWindowFail.event,this._onDidLayoutFromJSON=new Emitter,this.onDidLayoutFromJSON=this._onDidLayoutFromJSON.event,this._onDidActivePanelChange=new Emitter({replay:!0}),this.onDidActivePanelChange=this._onDidActivePanelChange.event,this._onDidMovePanel=new Emitter,this.onDidMovePanel=this._onDidMovePanel.event,this._onDidMaximizedGroupChange=new Emitter,this.onDidMaximizedGroupChange=this._onDidMaximizedGroupChange.event,this._floatingGroups=[],this._popoutGroups=[],this._popoutRestorationPromise=Promise.resolve(),this._onDidRemoveGroup=new Emitter,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidAddGroup=new Emitter,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidOptionsChange=new Emitter,this.onDidOptionsChange=this._onDidOptionsChange.event,this._onDidActiveGroupChange=new Emitter,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._moving=!1,this._options=options,this.popupService=new PopupService(this.element),this._themeClassnames=new Classnames(this.element),this._api=new DockviewApi(this),this.rootDropTargetContainer=new DropTargetAnchorContainer(this.element,{disabled:!0}),this.overlayRenderContainer=new OverlayRenderContainer(this.gridview.element,this),this._rootDropTarget=new Droptarget(this.element,{className:"dv-drop-target-edge",canDisplayOverlay:(event,position)=>{const data=getPanelData();if(data)return data.viewId!==this.id?!1:position==="center"?this.gridview.length===0:!0;if(position==="center"&&this.gridview.length!==0)return!1;const firedEvent=new DockviewUnhandledDragOverEvent(event,"edge",position,getPanelData);return this._onUnhandledDragOverEvent.fire(firedEvent),firedEvent.isAccepted},acceptedTargetZones:["top","bottom","left","right","center"],overlayModel:(_c=options.rootOverlayModel)!==null&&_c!==void 0?_c:DEFAULT_ROOT_OVERLAY_MODEL,getOverrideTarget:()=>{var _a2;return(_a2=this.rootDropTargetContainer)===null||_a2===void 0?void 0:_a2.model}}),this.updateDropTargetModel(options),toggleClass(this.gridview.element,"dv-dockview",!0),toggleClass(this.element,"dv-debug",!!options.debug),this.updateTheme(),this.updateWatermark(),options.debug&&this.addDisposables(new StrictEventsSequencing(this)),this.addDisposables(this.rootDropTargetContainer,this.overlayRenderContainer,this._onWillDragPanel,this._onWillDragGroup,this._onWillShowOverlay,this._onDidActivePanelChange,this._onDidAddPanel,this._onDidRemovePanel,this._onDidLayoutFromJSON,this._onDidDrop,this._onWillDrop,this._onDidMovePanel,this._onDidMovePanel.event(()=>{this.debouncedUpdateAllPositions()}),this._onDidAddGroup,this._onDidRemoveGroup,this._onDidActiveGroupChange,this._onUnhandledDragOverEvent,this._onDidMaximizedGroupChange,this._onDidOptionsChange,this._onDidPopoutGroupSizeChange,this._onDidPopoutGroupPositionChange,this._onDidOpenPopoutWindowFail,this.onDidViewVisibilityChangeMicroTaskQueue(()=>{this.updateWatermark()}),this.onDidAdd(event=>{this._moving||this._onDidAddGroup.fire(event)}),this.onDidRemove(event=>{this._moving||this._onDidRemoveGroup.fire(event)}),this.onDidActiveChange(event=>{this._moving||this._onDidActiveGroupChange.fire(event)}),this.onDidMaximizedChange(event=>{this._onDidMaximizedGroupChange.fire({group:event.panel,isMaximized:event.isMaximized})}),Event$1.any(this.onDidAdd,this.onDidRemove)(()=>{this.updateWatermark()}),Event$1.any(this.onDidAddPanel,this.onDidRemovePanel,this.onDidAddGroup,this.onDidRemove,this.onDidMovePanel,this.onDidActivePanelChange,this.onDidPopoutGroupPositionChange,this.onDidPopoutGroupSizeChange)(()=>{this._bufferOnDidLayoutChange.fire()}),Disposable.from(()=>{for(const group of[...this._floatingGroups])group.dispose();for(const group of[...this._popoutGroups])group.disposable.dispose()}),this._rootDropTarget,this._rootDropTarget.onWillShowOverlay(event=>{this.gridview.length>0&&event.position==="center"||this._onWillShowOverlay.fire(new DockviewWillShowOverlayLocationEvent(event,{kind:"edge",panel:void 0,api:this._api,group:void 0,getData:getPanelData}))}),this._rootDropTarget.onDrop(event=>{var _a2;const willDropEvent=new DockviewWillDropEvent({nativeEvent:event.nativeEvent,position:event.position,panel:void 0,api:this._api,group:void 0,getData:getPanelData,kind:"edge"});if(this._onWillDrop.fire(willDropEvent),willDropEvent.defaultPrevented)return;const data=getPanelData();data?this.moveGroupOrPanel({from:{groupId:data.groupId,panelId:(_a2=data.panelId)!==null&&_a2!==void 0?_a2:void 0},to:{group:this.orthogonalize(event.position),position:"center"}}):this._onDidDrop.fire(new DockviewDidDropEvent({nativeEvent:event.nativeEvent,position:event.position,panel:void 0,api:this._api,group:void 0,getData:getPanelData}))}),this._rootDropTarget)}setVisible(panel2,visible){switch(panel2.api.location.type){case"grid":super.setVisible(panel2,visible);break;case"floating":{const item=this.floatingGroups.find(floatingGroup=>floatingGroup.group===panel2);item&&(item.overlay.setVisible(visible),panel2.api._onDidVisibilityChange.fire({isVisible:visible}));break}case"popout":console.warn("dockview: You cannot hide a group that is in a popout window");break}}addPopoutGroup(itemToPopout,options){var _a,_b,_c,_d,_e;if(itemToPopout instanceof DockviewPanel&&itemToPopout.group.size===1)return this.addPopoutGroup(itemToPopout.group,options);const theme=getDockviewTheme(this.gridview.element),element=this.element;function getBox(){return options?.position?options.position:itemToPopout instanceof DockviewGroupPanel?itemToPopout.element.getBoundingClientRect():itemToPopout.group?itemToPopout.group.element.getBoundingClientRect():element.getBoundingClientRect()}const box=getBox(),groupId=(_b=(_a=options?.overridePopoutGroup)===null||_a===void 0?void 0:_a.id)!==null&&_b!==void 0?_b:this.getNextGroupId(),_window=new PopoutWindow(`${this.id}-${groupId}`,theme??"",{url:(_e=(_c=options?.popoutUrl)!==null&&_c!==void 0?_c:(_d=this.options)===null||_d===void 0?void 0:_d.popoutUrl)!==null&&_e!==void 0?_e:"/popout.html",left:window.screenX+box.left,top:window.screenY+box.top,width:box.width,height:box.height,onDidOpen:options?.onDidOpen,onWillClose:options?.onWillClose}),popoutWindowDisposable=new CompositeDisposable(_window,_window.onDidClose(()=>{popoutWindowDisposable.dispose()}));return _window.open().then(popoutContainer=>{var _a2;if(_window.isDisposed)return!1;const referenceGroup=options?.referenceGroup?options.referenceGroup:itemToPopout instanceof DockviewPanel?itemToPopout.group:itemToPopout,referenceLocation=itemToPopout.api.location.type,isGroupAddedToDom=referenceGroup.element.parentElement!==null;let group;if(isGroupAddedToDom?options?.overridePopoutGroup?group=options.overridePopoutGroup:(group=this.createGroup({id:groupId}),popoutContainer&&this._onDidAddGroup.fire(group)):group=referenceGroup,popoutContainer===null)return console.error("dockview: failed to create popout. perhaps you need to allow pop-ups for this website"),popoutWindowDisposable.dispose(),this._onDidOpenPopoutWindowFail.fire(),this.movingLock(()=>moveGroupWithoutDestroying({from:group,to:referenceGroup})),referenceGroup.api.isVisible||referenceGroup.api.setVisible(!0),!1;const gready=document.createElement("div");gready.className="dv-overlay-render-container";const overlayRenderContainer=new OverlayRenderContainer(gready,this);group.model.renderContainer=overlayRenderContainer,group.layout(_window.window.innerWidth,_window.window.innerHeight);let floatingBox;if(!options?.overridePopoutGroup&&isGroupAddedToDom)if(itemToPopout instanceof DockviewPanel)this.movingLock(()=>{const panel2=referenceGroup.model.removePanel(itemToPopout);group.model.openPanel(panel2)});else switch(this.movingLock(()=>moveGroupWithoutDestroying({from:referenceGroup,to:group})),referenceLocation){case"grid":referenceGroup.api.setVisible(!1);break;case"floating":case"popout":floatingBox=(_a2=this._floatingGroups.find(value3=>value3.group.api.id===itemToPopout.api.id))===null||_a2===void 0?void 0:_a2.overlay.toJSON(),this.removeGroup(referenceGroup);break}popoutContainer.classList.add("dv-dockview"),popoutContainer.style.overflow="hidden",popoutContainer.appendChild(gready),popoutContainer.appendChild(group.element);const anchor=document.createElement("div"),dropTargetContainer=new DropTargetAnchorContainer(anchor,{disabled:this.rootDropTargetContainer.disabled});popoutContainer.appendChild(anchor),group.model.dropTargetContainer=dropTargetContainer,group.model.location={type:"popout",getWindow:()=>_window.window,popoutUrl:options?.popoutUrl},isGroupAddedToDom&&itemToPopout.api.location.type==="grid"&&itemToPopout.api.setVisible(!1),this.doSetGroupAndPanelActive(group),popoutWindowDisposable.addDisposables(group.api.onDidActiveChange(event=>{var _a3;event.isActive&&((_a3=_window.window)===null||_a3===void 0||_a3.focus())}),group.api.onWillFocus(()=>{var _a3;(_a3=_window.window)===null||_a3===void 0||_a3.focus()}));let returnedGroup;const isValidReferenceGroup=isGroupAddedToDom&&referenceGroup&&this.getPanel(referenceGroup.id),value2={window:_window,popoutGroup:group,referenceGroup:isValidReferenceGroup?referenceGroup.id:void 0,disposable:{dispose:()=>(popoutWindowDisposable.dispose(),returnedGroup)}},_onDidWindowPositionChange=onDidWindowMoveEnd(_window.window);return popoutWindowDisposable.addDisposables(_onDidWindowPositionChange,onDidWindowResizeEnd(_window.window,()=>{this._onDidPopoutGroupSizeChange.fire({width:_window.window.innerWidth,height:_window.window.innerHeight,group})}),_onDidWindowPositionChange.event(()=>{this._onDidPopoutGroupPositionChange.fire({screenX:_window.window.screenX,screenY:_window.window.screenX,group})}),addDisposableListener(_window.window,"resize",()=>{group.layout(_window.window.innerWidth,_window.window.innerHeight)}),overlayRenderContainer,Disposable.from(()=>{if(!this.isDisposed){if(isGroupAddedToDom&&this.getPanel(referenceGroup.id))this.movingLock(()=>moveGroupWithoutDestroying({from:group,to:referenceGroup})),referenceGroup.api.isVisible||referenceGroup.api.setVisible(!0),this.getPanel(group.id)&&this.doRemoveGroup(group,{skipPopoutAssociated:!0});else if(this.getPanel(group.id)){if(group.model.renderContainer=this.overlayRenderContainer,group.model.dropTargetContainer=this.rootDropTargetContainer,returnedGroup=group,!this._popoutGroups.find(p=>p.popoutGroup===group))return;floatingBox?this.addFloatingGroup(group,{height:floatingBox.height,width:floatingBox.width,position:floatingBox}):(this.doRemoveGroup(group,{skipDispose:!0,skipActive:!0,skipPopoutReturn:!0}),group.model.location={type:"grid"},this.movingLock(()=>{this.doAddGroup(group,[0])})),this.doSetGroupAndPanelActive(group)}}})),this._popoutGroups.push(value2),this.updateWatermark(),!0}).catch(err=>(console.error("dockview: failed to create popout.",err),!1))}addFloatingGroup(item,options){var _a,_b,_c,_d,_e;let group;if(item instanceof DockviewPanel)group=this.createGroup(),this._onDidAddGroup.fire(group),this.movingLock(()=>this.removePanel(item,{removeEmptyGroup:!0,skipDispose:!0,skipSetActiveGroup:!0})),this.movingLock(()=>group.model.openPanel(item,{skipSetGroupActive:!0}));else{group=item;const popoutReferenceGroupId=(_a=this._popoutGroups.find(_=>_.popoutGroup===group))===null||_a===void 0?void 0:_a.referenceGroup,popoutReferenceGroup=popoutReferenceGroupId?this.getPanel(popoutReferenceGroupId):void 0;typeof options?.skipRemoveGroup=="boolean"&&options.skipRemoveGroup||(popoutReferenceGroup?(this.movingLock(()=>moveGroupWithoutDestroying({from:item,to:popoutReferenceGroup})),this.doRemoveGroup(item,{skipPopoutReturn:!0,skipPopoutAssociated:!0}),this.doRemoveGroup(popoutReferenceGroup,{skipDispose:!0}),group=popoutReferenceGroup):this.doRemoveGroup(item,{skipDispose:!0,skipPopoutReturn:!0,skipPopoutAssociated:!1}))}function getAnchoredBox(){if(options?.position){const result={};return"left"in options.position?result.left=Math.max(options.position.left,0):"right"in options.position?result.right=Math.max(options.position.right,0):result.left=DEFAULT_FLOATING_GROUP_POSITION.left,"top"in options.position?result.top=Math.max(options.position.top,0):"bottom"in options.position?result.bottom=Math.max(options.position.bottom,0):result.top=DEFAULT_FLOATING_GROUP_POSITION.top,typeof options.width=="number"?result.width=Math.max(options.width,0):result.width=DEFAULT_FLOATING_GROUP_POSITION.width,typeof options.height=="number"?result.height=Math.max(options.height,0):result.height=DEFAULT_FLOATING_GROUP_POSITION.height,result}return{left:typeof options?.x=="number"?Math.max(options.x,0):DEFAULT_FLOATING_GROUP_POSITION.left,top:typeof options?.y=="number"?Math.max(options.y,0):DEFAULT_FLOATING_GROUP_POSITION.top,width:typeof options?.width=="number"?Math.max(options.width,0):DEFAULT_FLOATING_GROUP_POSITION.width,height:typeof options?.height=="number"?Math.max(options.height,0):DEFAULT_FLOATING_GROUP_POSITION.height}}const anchoredBox=getAnchoredBox(),overlay=new Overlay(Object.assign(Object.assign({container:this.gridview.element,content:group.element},anchoredBox),{minimumInViewportWidth:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(_c=(_b=this.options.floatingGroupBounds)===null||_b===void 0?void 0:_b.minimumWidthWithinViewport)!==null&&_c!==void 0?_c:DEFAULT_FLOATING_GROUP_OVERFLOW_SIZE,minimumInViewportHeight:this.options.floatingGroupBounds==="boundedWithinViewport"?void 0:(_e=(_d=this.options.floatingGroupBounds)===null||_d===void 0?void 0:_d.minimumHeightWithinViewport)!==null&&_e!==void 0?_e:DEFAULT_FLOATING_GROUP_OVERFLOW_SIZE})),el=group.element.querySelector(".dv-void-container");if(!el)throw new Error("dockview: failed to find drag handle");overlay.setupDrag(el,{inDragMode:typeof options?.inDragMode=="boolean"?options.inDragMode:!1});const floatingGroupPanel=new DockviewFloatingGroupPanel(group,overlay),disposable=new CompositeDisposable(group.api.onDidActiveChange(event=>{event.isActive&&overlay.bringToFront()}),watchElementResize(group.element,entry=>{const{width,height}=entry.contentRect;group.layout(width,height)}));floatingGroupPanel.addDisposables(overlay.onDidChange(()=>{group.layout(group.width,group.height)}),overlay.onDidChangeEnd(()=>{this._bufferOnDidLayoutChange.fire()}),group.onDidChange(event=>{overlay.setBounds({height:event?.height,width:event?.width})}),{dispose:()=>{disposable.dispose(),remove(this._floatingGroups,floatingGroupPanel),group.model.location={type:"grid"},this.updateWatermark()}}),this._floatingGroups.push(floatingGroupPanel),group.model.location={type:"floating"},options?.skipActiveGroup||this.doSetGroupAndPanelActive(group),this.updateWatermark()}orthogonalize(position,options){switch(this.gridview.normalize(),position){case"top":case"bottom":this.gridview.orientation===Orientation.HORIZONTAL&&this.gridview.insertOrthogonalSplitviewAtRoot();break;case"left":case"right":this.gridview.orientation===Orientation.VERTICAL&&this.gridview.insertOrthogonalSplitviewAtRoot();break}switch(position){case"top":case"left":case"center":return this.createGroupAtLocation([0],void 0,options);case"bottom":case"right":return this.createGroupAtLocation([this.gridview.length],void 0,options);default:throw new Error(`dockview: unsupported position ${position}`)}}updateOptions(options){var _a,_b;if(super.updateOptions(options),"floatingGroupBounds"in options)for(const group of this._floatingGroups){switch(options.floatingGroupBounds){case"boundedWithinViewport":group.overlay.minimumInViewportHeight=void 0,group.overlay.minimumInViewportWidth=void 0;break;case void 0:group.overlay.minimumInViewportHeight=DEFAULT_FLOATING_GROUP_OVERFLOW_SIZE,group.overlay.minimumInViewportWidth=DEFAULT_FLOATING_GROUP_OVERFLOW_SIZE;break;default:group.overlay.minimumInViewportHeight=(_a=options.floatingGroupBounds)===null||_a===void 0?void 0:_a.minimumHeightWithinViewport,group.overlay.minimumInViewportWidth=(_b=options.floatingGroupBounds)===null||_b===void 0?void 0:_b.minimumWidthWithinViewport}group.overlay.setBounds()}this.updateDropTargetModel(options);const oldDisableDnd=this.options.disableDnd;this._options=Object.assign(Object.assign({},this.options),options);const newDisableDnd=this.options.disableDnd;if(oldDisableDnd!==newDisableDnd&&this.updateDragAndDropState(),"theme"in options&&this.updateTheme(),"createRightHeaderActionComponent"in options||"createLeftHeaderActionComponent"in options||"createPrefixHeaderActionComponent"in options)for(const group of this.groups)group.model.updateHeaderActions();this.layout(this.gridview.width,this.gridview.height,!0)}layout(width,height,forceResize){if(super.layout(width,height,forceResize),this._floatingGroups)for(const floating of this._floatingGroups)floating.overlay.setBounds()}updateDragAndDropState(){for(const group of this.groups)group.model.updateDragAndDropState()}focus(){var _a;(_a=this.activeGroup)===null||_a===void 0||_a.focus()}getGroupPanel(id){return this.panels.find(panel2=>panel2.id===id)}setActivePanel(panel2){panel2.group.model.openPanel(panel2),this.doSetGroupAndPanelActive(panel2.group)}moveToNext(options={}){var _a;if(!options.group){if(!this.activeGroup)return;options.group=this.activeGroup}if(options.includePanel&&options.group&&options.group.activePanel!==options.group.panels[options.group.panels.length-1]){options.group.model.moveToNext({suppressRoll:!0});return}const location=getGridLocation(options.group.element),next=(_a=this.gridview.next(location))===null||_a===void 0?void 0:_a.view;this.doSetGroupAndPanelActive(next)}moveToPrevious(options={}){var _a;if(!options.group){if(!this.activeGroup)return;options.group=this.activeGroup}if(options.includePanel&&options.group&&options.group.activePanel!==options.group.panels[0]){options.group.model.moveToPrevious({suppressRoll:!0});return}const location=getGridLocation(options.group.element),next=(_a=this.gridview.previous(location))===null||_a===void 0?void 0:_a.view;next&&this.doSetGroupAndPanelActive(next)}toJSON(){var _a;const data=this.gridview.serialize(),panels=this.panels.reduce((collection,panel2)=>(collection[panel2.id]=panel2.toJSON(),collection),{}),floats=this._floatingGroups.map(group=>({data:group.group.toJSON(),position:group.overlay.toJSON()})),popoutGroups=this._popoutGroups.map(group=>({data:group.popoutGroup.toJSON(),gridReferenceGroup:group.referenceGroup,position:group.window.dimensions(),url:group.popoutGroup.api.location.type==="popout"?group.popoutGroup.api.location.popoutUrl:void 0})),result={grid:data,panels,activeGroup:(_a=this.activeGroup)===null||_a===void 0?void 0:_a.id};return floats.length>0&&(result.floatingGroups=floats),popoutGroups.length>0&&(result.popoutGroups=popoutGroups),result}fromJSON(data,options){var _a,_b;const existingPanels=new Map;let tempGroup;if(options?.reuseExistingPanels){tempGroup=this.createGroup(),this._groups.delete(tempGroup.api.id);const newPanels=Object.keys(data.panels);for(const panel2 of this.panels)newPanels.includes(panel2.api.id)&&existingPanels.set(panel2.api.id,panel2);this.movingLock(()=>{Array.from(existingPanels.values()).forEach(panel2=>{this.moveGroupOrPanel({from:{groupId:panel2.api.group.api.id,panelId:panel2.api.id},to:{group:tempGroup,position:"center"},keepEmptyGroups:!0})})})}if(this.clear(),typeof data!="object"||data===null)throw new Error("dockview: serialized layout must be a non-null object");const{grid,panels,activeGroup}=data;if(grid.root.type!=="branch"||!Array.isArray(grid.root.data))throw new Error("dockview: root must be of type branch");try{const width=this.width,height=this.height,createGroupFromSerializedState=data2=>{const{id,locked,hideHeader,headerPosition,views,activeView}=data2;if(typeof id!="string")throw new Error("dockview: group id must be of type string");const group=this.createGroup({id,locked:!!locked,hideHeader:!!hideHeader,headerPosition});this._onDidAddGroup.fire(group);const createdPanels=[];for(const child of views){const existingPanel=existingPanels.get(child);if(tempGroup&&existingPanel)this.movingLock(()=>{tempGroup.model.removePanel(existingPanel)}),createdPanels.push(existingPanel),existingPanel.updateFromStateModel(panels[child]);else{const panel2=this._deserializer.fromJSON(panels[child],group);createdPanels.push(panel2)}}for(let i=0;i<views.length;i++){const panel2=createdPanels[i],isActive=typeof activeView=="string"&&activeView===panel2.id;existingPanels.has(panel2.api.id)?this.movingLock(()=>{group.model.openPanel(panel2,{skipSetActive:!isActive,skipSetGroupActive:!0})}):group.model.openPanel(panel2,{skipSetActive:!isActive,skipSetGroupActive:!0})}return!group.activePanel&&group.panels.length>0&&group.model.openPanel(group.panels[group.panels.length-1],{skipSetGroupActive:!0}),group};this.gridview.deserialize(grid,{fromJSON:node=>createGroupFromSerializedState(node.data)}),this.layout(width,height,!0);const serializedFloatingGroups=(_a=data.floatingGroups)!==null&&_a!==void 0?_a:[];for(const serializedFloatingGroup of serializedFloatingGroups){const{data:data2,position}=serializedFloatingGroup,group=createGroupFromSerializedState(data2);this.addFloatingGroup(group,{position,width:position.width,height:position.height,skipRemoveGroup:!0,inDragMode:!1})}const serializedPopoutGroups=(_b=data.popoutGroups)!==null&&_b!==void 0?_b:[],popoutPromises=[];serializedPopoutGroups.forEach((serializedPopoutGroup,index)=>{const{data:data2,position,gridReferenceGroup,url}=serializedPopoutGroup,group=createGroupFromSerializedState(data2),popoutPromise=new Promise(resolve=>{setTimeout(()=>{this.addPopoutGroup(group,{position:position??void 0,overridePopoutGroup:gridReferenceGroup?group:void 0,referenceGroup:gridReferenceGroup?this.getPanel(gridReferenceGroup):void 0,popoutUrl:url}),resolve()},index*DESERIALIZATION_POPOUT_DELAY_MS)});popoutPromises.push(popoutPromise)}),this._popoutRestorationPromise=Promise.all(popoutPromises).then(()=>{});for(const floatingGroup of this._floatingGroups)floatingGroup.overlay.setBounds();if(typeof activeGroup=="string"){const panel2=this.getPanel(activeGroup);panel2&&this.doSetGroupAndPanelActive(panel2)}}catch(err){console.error("dockview: failed to deserialize layout. Reverting changes",err);for(const group of this.groups)for(const panel2 of group.panels)this.removePanel(panel2,{removeEmptyGroup:!1,skipDispose:!1});for(const group of this.groups)group.dispose(),this._groups.delete(group.id),this._onDidRemoveGroup.fire(group);for(const floatingGroup of[...this._floatingGroups])floatingGroup.dispose();throw this.clear(),err}this.updateWatermark(),this.debouncedUpdateAllPositions(),this._onDidLayoutFromJSON.fire()}clear(){const groups=Array.from(this._groups.values()).map(_=>_.value),hasActiveGroup=!!this.activeGroup;for(const group of groups)this.removeGroup(group,{skipActive:!0});hasActiveGroup&&this.doSetGroupAndPanelActive(void 0),this.gridview.clear()}closeAllGroups(){for(const entry of this._groups.entries()){const[_,group]=entry;group.value.model.closeAllPanels()}}addPanel(options){var _a,_b;if(this.panels.find(_=>_.id===options.id))throw new Error(`dockview: panel with id ${options.id} already exists`);let referenceGroup;if(options.position&&options.floating)throw new Error("dockview: you can only provide one of: position, floating as arguments to .addPanel(...)");const initial={width:options.initialWidth,height:options.initialHeight};let index;if(options.position)if(isPanelOptionsWithPanel(options.position)){const referencePanel=typeof options.position.referencePanel=="string"?this.getGroupPanel(options.position.referencePanel):options.position.referencePanel;if(index=options.position.index,!referencePanel)throw new Error(`dockview: referencePanel '${options.position.referencePanel}' does not exist`);referenceGroup=this.findGroup(referencePanel)}else if(isPanelOptionsWithGroup(options.position)){if(referenceGroup=typeof options.position.referenceGroup=="string"?(_a=this._groups.get(options.position.referenceGroup))===null||_a===void 0?void 0:_a.value:options.position.referenceGroup,index=options.position.index,!referenceGroup)throw new Error(`dockview: referenceGroup '${options.position.referenceGroup}' does not exist`)}else{const group=this.orthogonalize(directionToPosition(options.position.direction)),panel3=this.createPanel(options,group);return group.model.openPanel(panel3,{skipSetActive:options.inactive,skipSetGroupActive:options.inactive,index}),options.inactive||this.doSetGroupAndPanelActive(group),group.api.setSize({height:initial?.height,width:initial?.width}),panel3}else referenceGroup=this.activeGroup;let panel2;if(referenceGroup){const target=toTarget(((_b=options.position)===null||_b===void 0?void 0:_b.direction)||"within");if(options.floating){const group=this.createGroup();this._onDidAddGroup.fire(group);const floatingGroupOptions=typeof options.floating=="object"&&options.floating!==null?options.floating:{};this.addFloatingGroup(group,Object.assign(Object.assign({},floatingGroupOptions),{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),panel2=this.createPanel(options,group),group.model.openPanel(panel2,{skipSetActive:options.inactive,skipSetGroupActive:options.inactive,index})}else if(referenceGroup.api.location.type==="floating"||target==="center")panel2=this.createPanel(options,referenceGroup),referenceGroup.model.openPanel(panel2,{skipSetActive:options.inactive,skipSetGroupActive:options.inactive,index}),referenceGroup.api.setSize({width:initial?.width,height:initial?.height}),options.inactive||this.doSetGroupAndPanelActive(referenceGroup);else{const location=getGridLocation(referenceGroup.element),relativeLocation=getRelativeLocation(this.gridview.orientation,location,target),group=this.createGroupAtLocation(relativeLocation,this.orientationAtLocation(relativeLocation)===Orientation.VERTICAL?initial?.height:initial?.width);panel2=this.createPanel(options,group),group.model.openPanel(panel2,{skipSetActive:options.inactive,skipSetGroupActive:options.inactive,index}),options.inactive||this.doSetGroupAndPanelActive(group)}}else if(options.floating){const group=this.createGroup();this._onDidAddGroup.fire(group);const coordinates=typeof options.floating=="object"&&options.floating!==null?options.floating:{};this.addFloatingGroup(group,Object.assign(Object.assign({},coordinates),{inDragMode:!1,skipRemoveGroup:!0,skipActiveGroup:!0})),panel2=this.createPanel(options,group),group.model.openPanel(panel2,{skipSetActive:options.inactive,skipSetGroupActive:options.inactive,index})}else{const group=this.createGroupAtLocation([0],this.gridview.orientation===Orientation.VERTICAL?initial?.height:initial?.width);panel2=this.createPanel(options,group),group.model.openPanel(panel2,{skipSetActive:options.inactive,skipSetGroupActive:options.inactive,index}),options.inactive||this.doSetGroupAndPanelActive(group)}return panel2}removePanel(panel2,options={removeEmptyGroup:!0}){const group=panel2.group;if(!group)throw new Error(`dockview: cannot remove panel ${panel2.id}. it's missing a group.`);group.model.removePanel(panel2,{skipSetActiveGroup:options.skipSetActiveGroup}),options.skipDispose||(panel2.group.model.renderContainer.detatch(panel2),panel2.dispose()),group.size===0&&options.removeEmptyGroup&&this.removeGroup(group,{skipActive:options.skipSetActiveGroup})}createWatermarkComponent(){return this.options.createWatermarkComponent?this.options.createWatermarkComponent():new Watermark}updateWatermark(){var _a,_b;if(this.groups.filter(x=>x.api.location.type==="grid"&&x.api.isVisible).length===0){if(!this._watermark){this._watermark=this.createWatermarkComponent(),this._watermark.init({containerApi:new DockviewApi(this)});const watermarkContainer=document.createElement("div");watermarkContainer.className="dv-watermark-container",addTestId(watermarkContainer,"watermark-component"),watermarkContainer.appendChild(this._watermark.element),this.gridview.element.appendChild(watermarkContainer)}}else this._watermark&&(this._watermark.element.parentElement.remove(),(_b=(_a=this._watermark).dispose)===null||_b===void 0||_b.call(_a),this._watermark=null)}addGroup(options){var _a;if(options){let referenceGroup;if(isGroupOptionsWithPanel(options)){const referencePanel=typeof options.referencePanel=="string"?this.panels.find(panel2=>panel2.id===options.referencePanel):options.referencePanel;if(!referencePanel)throw new Error(`dockview: reference panel ${options.referencePanel} does not exist`);if(referenceGroup=this.findGroup(referencePanel),!referenceGroup)throw new Error(`dockview: reference group for reference panel ${options.referencePanel} does not exist`)}else if(isGroupOptionsWithGroup(options)){if(referenceGroup=typeof options.referenceGroup=="string"?(_a=this._groups.get(options.referenceGroup))===null||_a===void 0?void 0:_a.value:options.referenceGroup,!referenceGroup)throw new Error(`dockview: reference group ${options.referenceGroup} does not exist`)}else{const group2=this.orthogonalize(directionToPosition(options.direction),options);return options.skipSetActive||this.doSetGroupAndPanelActive(group2),group2}const target=toTarget(options.direction||"within"),location=getGridLocation(referenceGroup.element),relativeLocation=getRelativeLocation(this.gridview.orientation,location,target),group=this.createGroup(options),size=this.getLocationOrientation(relativeLocation)===Orientation.VERTICAL?options.initialHeight:options.initialWidth;return this.doAddGroup(group,relativeLocation,size),options.skipSetActive||this.doSetGroupAndPanelActive(group),group}else{const group=this.createGroup(options);return this.doAddGroup(group),this.doSetGroupAndPanelActive(group),group}}getLocationOrientation(location){return location.length%2==0&&this.gridview.orientation===Orientation.HORIZONTAL?Orientation.HORIZONTAL:Orientation.VERTICAL}removeGroup(group,options){this.doRemoveGroup(group,options)}doRemoveGroup(group,options){var _a;const panels=[...group.panels];if(!options?.skipDispose)for(const panel2 of panels)this.removePanel(panel2,{removeEmptyGroup:!1,skipDispose:(_a=options?.skipDispose)!==null&&_a!==void 0?_a:!1});const activePanel=this.activePanel;if(group.api.location.type==="floating"){const floatingGroup=this._floatingGroups.find(_=>_.group===group);if(floatingGroup){if(options?.skipDispose||(floatingGroup.group.dispose(),this._groups.delete(group.id),this._onDidRemoveGroup.fire(group)),remove(this._floatingGroups,floatingGroup),floatingGroup.dispose(),!options?.skipActive&&this._activeGroup===group){const groups=Array.from(this._groups.values());this.doSetGroupAndPanelActive(groups.length>0?groups[0].value:void 0)}return floatingGroup.group}throw new Error("dockview: failed to find floating group")}if(group.api.location.type==="popout"){const selectedGroup=this._popoutGroups.find(_=>_.popoutGroup===group);if(selectedGroup){if(!options?.skipDispose){if(!options?.skipPopoutAssociated){const refGroup=selectedGroup.referenceGroup?this.getPanel(selectedGroup.referenceGroup):void 0;refGroup&&refGroup.panels.length===0&&this.removeGroup(refGroup)}selectedGroup.popoutGroup.dispose(),this._groups.delete(group.id),this._onDidRemoveGroup.fire(group)}remove(this._popoutGroups,selectedGroup);const removedGroup=selectedGroup.disposable.dispose();if(!options?.skipPopoutReturn&&removedGroup&&(this.doAddGroup(removedGroup,[0]),this.doSetGroupAndPanelActive(removedGroup)),!options?.skipActive&&this._activeGroup===group){const groups=Array.from(this._groups.values());this.doSetGroupAndPanelActive(groups.length>0?groups[0].value:void 0)}return this.updateWatermark(),selectedGroup.popoutGroup}throw new Error("dockview: failed to find popout group")}const re=super.doRemoveGroup(group,options);return options?.skipActive||this.activePanel!==activePanel&&this._onDidActivePanelChange.fire(this.activePanel),re}debouncedUpdateAllPositions(){this._updatePositionsFrameId!==void 0&&cancelAnimationFrame(this._updatePositionsFrameId),this._updatePositionsFrameId=requestAnimationFrame(()=>{this._updatePositionsFrameId=void 0,this.overlayRenderContainer.updateAllPositions()})}movingLock(func){const isMoving=this._moving;try{return this._moving=!0,func()}finally{this._moving=isMoving}}moveGroupOrPanel(options){var _a;const destinationGroup=options.to.group,sourceGroupId=options.from.groupId,sourceItemId=options.from.panelId,destinationTarget=options.to.position,destinationIndex=options.to.index,sourceGroup=sourceGroupId?(_a=this._groups.get(sourceGroupId))===null||_a===void 0?void 0:_a.value:void 0;if(!sourceGroup)throw new Error(`dockview: Failed to find group id ${sourceGroupId}`);if(sourceItemId===void 0){this.moveGroup({from:{group:sourceGroup},to:{group:destinationGroup,position:destinationTarget},skipSetActive:options.skipSetActive});return}if(!destinationTarget||destinationTarget==="center"){const removedPanel=this.movingLock(()=>sourceGroup.model.removePanel(sourceItemId,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!removedPanel)throw new Error(`dockview: No panel with id ${sourceItemId}`);!options.keepEmptyGroups&&sourceGroup.model.size===0&&this.doRemoveGroup(sourceGroup,{skipActive:!0});const isDestinationGroupEmpty=destinationGroup.model.size===0;this.movingLock(()=>{var _a2;return destinationGroup.model.openPanel(removedPanel,{index:destinationIndex,skipSetActive:((_a2=options.skipSetActive)!==null&&_a2!==void 0?_a2:!1)&&!isDestinationGroupEmpty,skipSetGroupActive:!0})}),options.skipSetActive||this.doSetGroupAndPanelActive(destinationGroup),this._onDidMovePanel.fire({panel:removedPanel,from:sourceGroup})}else{const referenceLocation=getGridLocation(destinationGroup.element),targetLocation=getRelativeLocation(this.gridview.orientation,referenceLocation,destinationTarget);if(sourceGroup.size<2){const[targetParentLocation,to]=tail(targetLocation);if(sourceGroup.api.location.type==="grid"){const sourceLocation=getGridLocation(sourceGroup.element),[sourceParentLocation,from]=tail(sourceLocation);if(sequenceEquals(sourceParentLocation,targetParentLocation)){this.gridview.moveView(sourceParentLocation,from,to),this._onDidMovePanel.fire({panel:this.getGroupPanel(sourceItemId),from:sourceGroup});return}}if(sourceGroup.api.location.type==="popout"){const popoutGroup=this._popoutGroups.find(group=>group.popoutGroup===sourceGroup),removedPanel=this.movingLock(()=>popoutGroup.popoutGroup.model.removePanel(popoutGroup.popoutGroup.panels[0],{skipSetActive:!0,skipSetActiveGroup:!0}));this.doRemoveGroup(sourceGroup,{skipActive:!0});const newGroup=this.createGroupAtLocation(targetLocation);this.movingLock(()=>newGroup.model.openPanel(removedPanel,{skipSetActive:!0})),this.doSetGroupAndPanelActive(newGroup),this._onDidMovePanel.fire({panel:this.getGroupPanel(sourceItemId),from:sourceGroup});return}const targetGroup=this.movingLock(()=>this.doRemoveGroup(sourceGroup,{skipActive:!0,skipDispose:!0})),updatedReferenceLocation=getGridLocation(destinationGroup.element),location=getRelativeLocation(this.gridview.orientation,updatedReferenceLocation,destinationTarget);this.movingLock(()=>this.doAddGroup(targetGroup,location)),this.doSetGroupAndPanelActive(targetGroup),this._onDidMovePanel.fire({panel:this.getGroupPanel(sourceItemId),from:sourceGroup})}else{const removedPanel=this.movingLock(()=>sourceGroup.model.removePanel(sourceItemId,{skipSetActive:!1,skipSetActiveGroup:!0}));if(!removedPanel)throw new Error(`dockview: No panel with id ${sourceItemId}`);const dropLocation=getRelativeLocation(this.gridview.orientation,referenceLocation,destinationTarget),group=this.createGroupAtLocation(dropLocation);this.movingLock(()=>group.model.openPanel(removedPanel,{skipSetGroupActive:!0})),this.doSetGroupAndPanelActive(group),this._onDidMovePanel.fire({panel:removedPanel,from:sourceGroup})}}}moveGroup(options){const from=options.from.group,to=options.to.group,target=options.to.position;if(target==="center"){const activePanel=from.activePanel,panels=this.movingLock(()=>[...from.panels].map(p=>from.model.removePanel(p.id,{skipSetActive:!0})));from?.model.size===0&&this.doRemoveGroup(from,{skipActive:!0}),this.movingLock(()=>{for(const panel2 of panels)to.model.openPanel(panel2,{skipSetActive:panel2!==activePanel,skipSetGroupActive:!0})}),options.skipSetActive!==!0?this.doSetGroupAndPanelActive(to):this.activePanel||this.doSetGroupAndPanelActive(to)}else{switch(from.api.location.type){case"grid":this.gridview.removeView(getGridLocation(from.element));break;case"floating":{const selectedFloatingGroup=this._floatingGroups.find(x=>x.group===from);if(!selectedFloatingGroup)throw new Error("dockview: failed to find floating group");selectedFloatingGroup.dispose();break}case"popout":{const selectedPopoutGroup=this._popoutGroups.find(x=>x.popoutGroup===from);if(!selectedPopoutGroup)throw new Error("dockview: failed to find popout group");const index=this._popoutGroups.indexOf(selectedPopoutGroup);if(index>=0&&this._popoutGroups.splice(index,1),selectedPopoutGroup.referenceGroup){const referenceGroup=this.getPanel(selectedPopoutGroup.referenceGroup);referenceGroup&&!referenceGroup.api.isVisible&&this.doRemoveGroup(referenceGroup,{skipActive:!0})}selectedPopoutGroup.window.dispose(),to.api.location.type==="grid"?(from.model.renderContainer=this.overlayRenderContainer,from.model.dropTargetContainer=this.rootDropTargetContainer,from.model.location={type:"grid"}):to.api.location.type==="floating"&&(from.model.renderContainer=this.overlayRenderContainer,from.model.dropTargetContainer=this.rootDropTargetContainer,from.model.location={type:"floating"});break}}if(to.api.location.type==="grid"){const referenceLocation=getGridLocation(to.element),dropLocation=getRelativeLocation(this.gridview.orientation,referenceLocation,target);let size;switch(this.gridview.orientation){case Orientation.VERTICAL:size=referenceLocation.length%2==0?from.api.width:from.api.height;break;case Orientation.HORIZONTAL:size=referenceLocation.length%2==0?from.api.height:from.api.width;break}this.gridview.addView(from,size,dropLocation)}else if(to.api.location.type==="floating"){const targetFloatingGroup=this._floatingGroups.find(x=>x.group===to);if(targetFloatingGroup){const box=targetFloatingGroup.overlay.toJSON();let left,top;"left"in box?left=box.left+50:"right"in box?left=Math.max(0,box.right-box.width-50):left=50,"top"in box?top=box.top+50:"bottom"in box?top=Math.max(0,box.bottom-box.height-50):top=50,this.addFloatingGroup(from,{height:box.height,width:box.width,position:{left,top}})}}}if(from.panels.forEach(panel2=>{this._onDidMovePanel.fire({panel:panel2,from})}),this.debouncedUpdateAllPositions(),options.skipSetActive===!1){const targetGroup=to??from;this.doSetGroupAndPanelActive(targetGroup)}}doSetGroupActive(group){super.doSetGroupActive(group);const activePanel=this.activePanel;!this._moving&&activePanel!==this._onDidActivePanelChange.value&&this._onDidActivePanelChange.fire(activePanel)}doSetGroupAndPanelActive(group){super.doSetGroupActive(group);const activePanel=this.activePanel;group&&this.hasMaximizedGroup()&&!this.isMaximizedGroup(group)&&this.exitMaximizedGroup(),!this._moving&&activePanel!==this._onDidActivePanelChange.value&&this._onDidActivePanelChange.fire(activePanel)}getNextGroupId(){let id=this.nextGroupId.next();for(;this._groups.has(id);)id=this.nextGroupId.next();return id}createGroup(options){options||(options={});let id=options?.id;if(id&&this._groups.has(options.id)&&(console.warn(`dockview: Duplicate group id ${options?.id}. reassigning group id to avoid errors`),id=void 0),!id)for(id=this.nextGroupId.next();this._groups.has(id);)id=this.nextGroupId.next();const view=new DockviewGroupPanel(this,id,options);if(view.init({params:{},accessor:this}),!this._groups.has(view.id)){const disposable=new CompositeDisposable(view.model.onTabDragStart(event=>{this._onWillDragPanel.fire(event)}),view.model.onGroupDragStart(event=>{this._onWillDragGroup.fire(event)}),view.model.onMove(event=>{const{groupId,itemId,target,index}=event;this.moveGroupOrPanel({from:{groupId,panelId:itemId},to:{group:view,position:target,index}})}),view.model.onDidDrop(event=>{this._onDidDrop.fire(event)}),view.model.onWillDrop(event=>{this._onWillDrop.fire(event)}),view.model.onWillShowOverlay(event=>{if(this.options.disableDnd){event.preventDefault();return}this._onWillShowOverlay.fire(event)}),view.model.onUnhandledDragOverEvent(event=>{this._onUnhandledDragOverEvent.fire(event)}),view.model.onDidAddPanel(event=>{this._moving||this._onDidAddPanel.fire(event.panel)}),view.model.onDidRemovePanel(event=>{this._moving||this._onDidRemovePanel.fire(event.panel)}),view.model.onDidActivePanelChange(event=>{this._moving||event.panel===this.activePanel&&this._onDidActivePanelChange.value!==event.panel&&this._onDidActivePanelChange.fire(event.panel)}),Event$1.any(view.model.onDidPanelTitleChange,view.model.onDidPanelParametersChange)(()=>{this._bufferOnDidLayoutChange.fire()}));this._groups.set(view.id,{value:view,disposable})}return view.initialize(),view}createPanel(options,group){var _a,_b,_c;const contentComponent=options.component,tabComponent=(_a=options.tabComponent)!==null&&_a!==void 0?_a:this.options.defaultTabComponent,view=new DockviewPanelModel(this,options.id,contentComponent,tabComponent),panel2=new DockviewPanel(options.id,contentComponent,tabComponent,this,this._api,group,view,{renderer:options.renderer,minimumWidth:options.minimumWidth,minimumHeight:options.minimumHeight,maximumWidth:options.maximumWidth,maximumHeight:options.maximumHeight});return panel2.init({title:(_b=options.title)!==null&&_b!==void 0?_b:options.id,params:(_c=options?.params)!==null&&_c!==void 0?_c:{}}),panel2}createGroupAtLocation(location,size,options){const group=this.createGroup(options);return this.doAddGroup(group,location,size),group}findGroup(panel2){var _a;return(_a=Array.from(this._groups.values()).find(group=>group.value.model.containsPanel(panel2)))===null||_a===void 0?void 0:_a.value}orientationAtLocation(location){const rootOrientation=this.gridview.orientation;return location.length%2==1?rootOrientation:orthogonal(rootOrientation)}updateDropTargetModel(options){"dndEdges"in options&&(this._rootDropTarget.disabled=typeof options.dndEdges=="boolean"&&options.dndEdges===!1,typeof options.dndEdges=="object"&&options.dndEdges!==null?this._rootDropTarget.setOverlayModel(options.dndEdges):this._rootDropTarget.setOverlayModel(DEFAULT_ROOT_OVERLAY_MODEL)),"rootOverlayModel"in options&&this.updateDropTargetModel({dndEdges:options.dndEdges})}updateTheme(){var _a,_b;const theme=(_a=this._options.theme)!==null&&_a!==void 0?_a:themeAbyss;switch(this._themeClassnames.setClassNames(theme.className),this.gridview.margin=(_b=theme.gap)!==null&&_b!==void 0?_b:0,theme.dndOverlayMounting){case"absolute":this.rootDropTargetContainer.disabled=!1;break;case"relative":default:this.rootDropTargetContainer.disabled=!0;break}}}class GridviewComponent extends BaseGrid{get orientation(){return this.gridview.orientation}set orientation(value2){this.gridview.orientation=value2}get options(){return this._options}get deserializer(){return this._deserializer}set deserializer(value2){this._deserializer=value2}constructor(container2,options){var _a;super(container2,{proportionalLayout:(_a=options.proportionalLayout)!==null&&_a!==void 0?_a:!0,orientation:options.orientation,styles:options.hideBorders?{separatorBorder:"transparent"}:void 0,disableAutoResizing:options.disableAutoResizing,className:options.className}),this._onDidLayoutfromJSON=new Emitter,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidRemoveGroup=new Emitter,this.onDidRemoveGroup=this._onDidRemoveGroup.event,this._onDidAddGroup=new Emitter,this.onDidAddGroup=this._onDidAddGroup.event,this._onDidActiveGroupChange=new Emitter,this.onDidActiveGroupChange=this._onDidActiveGroupChange.event,this._options=options,this.addDisposables(this._onDidAddGroup,this._onDidRemoveGroup,this._onDidActiveGroupChange,this.onDidAdd(event=>{this._onDidAddGroup.fire(event)}),this.onDidRemove(event=>{this._onDidRemoveGroup.fire(event)}),this.onDidActiveChange(event=>{this._onDidActiveGroupChange.fire(event)}))}updateOptions(options){super.updateOptions(options);const hasOrientationChanged=typeof options.orientation=="string"&&this.gridview.orientation!==options.orientation;this._options=Object.assign(Object.assign({},this.options),options),hasOrientationChanged&&(this.gridview.orientation=options.orientation),this.layout(this.gridview.width,this.gridview.height,!0)}removePanel(panel2){this.removeGroup(panel2)}toJSON(){var _a;return{grid:this.gridview.serialize(),activePanel:(_a=this.activeGroup)===null||_a===void 0?void 0:_a.id}}setVisible(panel2,visible){this.gridview.setViewVisible(getGridLocation(panel2.element),visible)}setActive(panel2){this._groups.forEach((value2,_key)=>{value2.value.setActive(panel2===value2.value)})}focus(){var _a;(_a=this.activeGroup)===null||_a===void 0||_a.focus()}fromJSON(serializedGridview){this.clear();const{grid,activePanel}=serializedGridview;try{const queue=[],width=this.width,height=this.height;if(this.gridview.deserialize(grid,{fromJSON:node=>{const{data}=node,view=this.options.createComponent({id:data.id,name:data.component});return queue.push(()=>view.init({params:data.params,minimumWidth:data.minimumWidth,maximumWidth:data.maximumWidth,minimumHeight:data.minimumHeight,maximumHeight:data.maximumHeight,priority:data.priority,snap:!!data.snap,accessor:this,isVisible:node.visible})),this._onDidAddGroup.fire(view),this.registerPanel(view),view}}),this.layout(width,height,!0),queue.forEach(f=>f()),typeof activePanel=="string"){const panel2=this.getPanel(activePanel);panel2&&this.doSetGroupActive(panel2)}}catch(err){for(const group of this.groups)group.dispose(),this._groups.delete(group.id),this._onDidRemoveGroup.fire(group);throw this.clear(),err}this._onDidLayoutfromJSON.fire()}clear(){const hasActiveGroup=this.activeGroup,groups=Array.from(this._groups.values());for(const group of groups)group.disposable.dispose(),this.doRemoveGroup(group.value,{skipActive:!0});hasActiveGroup&&this.doSetGroupActive(void 0),this.gridview.clear()}movePanel(panel2,options){var _a;let relativeLocation;const removedPanel=this.gridview.remove(panel2),referenceGroup=(_a=this._groups.get(options.reference))===null||_a===void 0?void 0:_a.value;if(!referenceGroup)throw new Error(`reference group ${options.reference} does not exist`);const target=toTarget(options.direction);if(target==="center")throw new Error(`${target} not supported as an option`);{const location=getGridLocation(referenceGroup.element);relativeLocation=getRelativeLocation(this.gridview.orientation,location,target)}this.doAddGroup(removedPanel,relativeLocation,options.size)}addPanel(options){var _a,_b,_c,_d;let relativeLocation=(_a=options.location)!==null&&_a!==void 0?_a:[0];if(!((_b=options.position)===null||_b===void 0)&&_b.referencePanel){const referenceGroup=(_c=this._groups.get(options.position.referencePanel))===null||_c===void 0?void 0:_c.value;if(!referenceGroup)throw new Error(`reference group ${options.position.referencePanel} does not exist`);const target=toTarget(options.position.direction);if(target==="center")throw new Error(`${target} not supported as an option`);{const location=getGridLocation(referenceGroup.element);relativeLocation=getRelativeLocation(this.gridview.orientation,location,target)}}const view=this.options.createComponent({id:options.id,name:options.component});return view.init({params:(_d=options.params)!==null&&_d!==void 0?_d:{},minimumWidth:options.minimumWidth,maximumWidth:options.maximumWidth,minimumHeight:options.minimumHeight,maximumHeight:options.maximumHeight,priority:options.priority,snap:!!options.snap,accessor:this,isVisible:!0}),this.doAddGroup(view,relativeLocation,options.size),this.registerPanel(view),this.doSetGroupActive(view),view}registerPanel(panel2){const disposable=new CompositeDisposable(panel2.api.onDidFocusChange(event=>{event.isFocused&&this._groups.forEach(groupItem=>{const group=groupItem.value;group!==panel2?group.setActive(!1):group.setActive(!0)})}));this._groups.set(panel2.id,{value:panel2,disposable})}moveGroup(referenceGroup,groupId,target){const sourceGroup=this.getPanel(groupId);if(!sourceGroup)throw new Error("invalid operation");const referenceLocation=getGridLocation(referenceGroup.element),targetLocation=getRelativeLocation(this.gridview.orientation,referenceLocation,target),[targetParentLocation,to]=tail(targetLocation),sourceLocation=getGridLocation(sourceGroup.element),[sourceParentLocation,from]=tail(sourceLocation);if(sequenceEquals(sourceParentLocation,targetParentLocation)){this.gridview.moveView(sourceParentLocation,from,to);return}const targetGroup=this.doRemoveGroup(sourceGroup,{skipActive:!0,skipDispose:!0}),updatedReferenceLocation=getGridLocation(referenceGroup.element),location=getRelativeLocation(this.gridview.orientation,updatedReferenceLocation,target);this.doAddGroup(targetGroup,location)}removeGroup(group){super.removeGroup(group)}dispose(){super.dispose(),this._onDidLayoutfromJSON.dispose()}}class SplitviewComponent extends Resizable{get panels(){return this.splitview.getViews()}get options(){return this._options}get length(){return this._panels.size}get orientation(){return this.splitview.orientation}get splitview(){return this._splitview}set splitview(value2){this._splitview&&this._splitview.dispose(),this._splitview=value2,this._splitviewChangeDisposable.value=new CompositeDisposable(this._splitview.onDidSashEnd(()=>{this._onDidLayoutChange.fire(void 0)}),this._splitview.onDidAddView(e=>this._onDidAddView.fire(e)),this._splitview.onDidRemoveView(e=>this._onDidRemoveView.fire(e)))}get minimumSize(){return this.splitview.minimumSize}get maximumSize(){return this.splitview.maximumSize}get height(){return this.splitview.orientation===Orientation.HORIZONTAL?this.splitview.orthogonalSize:this.splitview.size}get width(){return this.splitview.orientation===Orientation.HORIZONTAL?this.splitview.size:this.splitview.orthogonalSize}constructor(container2,options){var _a;super(document.createElement("div"),options.disableAutoResizing),this._splitviewChangeDisposable=new MutableDisposable,this._panels=new Map,this._onDidLayoutfromJSON=new Emitter,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidAddView=new Emitter,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new Emitter,this.onDidRemoveView=this._onDidRemoveView.event,this._onDidLayoutChange=new Emitter,this.onDidLayoutChange=this._onDidLayoutChange.event,this.element.style.height="100%",this.element.style.width="100%",this._classNames=new Classnames(this.element),this._classNames.setClassNames((_a=options.className)!==null&&_a!==void 0?_a:""),container2.appendChild(this.element),this._options=options,this.splitview=new Splitview(this.element,options),this.addDisposables(this._onDidAddView,this._onDidLayoutfromJSON,this._onDidRemoveView,this._onDidLayoutChange)}updateOptions(options){var _a,_b;"className"in options&&this._classNames.setClassNames((_a=options.className)!==null&&_a!==void 0?_a:""),"disableResizing"in options&&(this.disableResizing=(_b=options.disableAutoResizing)!==null&&_b!==void 0?_b:!1),typeof options.orientation=="string"&&(this.splitview.orientation=options.orientation),this._options=Object.assign(Object.assign({},this.options),options),this.splitview.layout(this.splitview.size,this.splitview.orthogonalSize)}focus(){var _a;(_a=this._activePanel)===null||_a===void 0||_a.focus()}movePanel(from,to){this.splitview.moveView(from,to)}setVisible(panel2,visible){const index=this.panels.indexOf(panel2);this.splitview.setViewVisible(index,visible)}setActive(panel2,skipFocus){this._activePanel=panel2,this.panels.filter(v=>v!==panel2).forEach(v=>{v.api._onDidActiveChange.fire({isActive:!1}),skipFocus||v.focus()}),panel2.api._onDidActiveChange.fire({isActive:!0}),skipFocus||panel2.focus()}removePanel(panel2,sizing){const item=this._panels.get(panel2.id);if(!item)throw new Error(`unknown splitview panel ${panel2.id}`);item.dispose(),this._panels.delete(panel2.id);const index=this.panels.findIndex(_=>_===panel2);this.splitview.removeView(index,sizing).dispose();const panels=this.panels;panels.length>0&&this.setActive(panels[panels.length-1])}getPanel(id){return this.panels.find(view=>view.id===id)}addPanel(options){var _a;if(this._panels.has(options.id))throw new Error(`panel ${options.id} already exists`);const view=this.options.createComponent({id:options.id,name:options.component});view.orientation=this.splitview.orientation,view.init({params:(_a=options.params)!==null&&_a!==void 0?_a:{},minimumSize:options.minimumSize,maximumSize:options.maximumSize,snap:options.snap,priority:options.priority,accessor:this});const size=typeof options.size=="number"?options.size:Sizing.Distribute,index=typeof options.index=="number"?options.index:void 0;return this.splitview.addView(view,size,index),this.doAddView(view),this.setActive(view),view}layout(width,height){const[size,orthogonalSize]=this.splitview.orientation===Orientation.HORIZONTAL?[width,height]:[height,width];this.splitview.layout(size,orthogonalSize)}doAddView(view){const disposable=view.api.onDidFocusChange(event=>{event.isFocused&&this.setActive(view,!0)});this._panels.set(view.id,disposable)}toJSON(){var _a;return{views:this.splitview.getViews().map((view,i)=>({size:this.splitview.getViewSize(i),data:view.toJSON(),snap:!!view.snap,priority:view.priority})),activeView:(_a=this._activePanel)===null||_a===void 0?void 0:_a.id,size:this.splitview.size,orientation:this.splitview.orientation}}fromJSON(serializedSplitview){this.clear();const{views,orientation,size,activeView}=serializedSplitview,queue=[],width=this.width,height=this.height;if(this.splitview=new Splitview(this.element,{orientation,proportionalLayout:this.options.proportionalLayout,descriptor:{size,views:views.map(view=>{const data=view.data;if(this._panels.has(data.id))throw new Error(`panel ${data.id} already exists`);const panel2=this.options.createComponent({id:data.id,name:data.component});return queue.push(()=>{var _a;panel2.init({params:(_a=data.params)!==null&&_a!==void 0?_a:{},minimumSize:data.minimumSize,maximumSize:data.maximumSize,snap:view.snap,priority:view.priority,accessor:this})}),panel2.orientation=orientation,this.doAddView(panel2),setTimeout(()=>{this._onDidAddView.fire(panel2)},0),{size:view.size,view:panel2}})}}),this.layout(width,height),queue.forEach(f=>f()),typeof activeView=="string"){const panel2=this.getPanel(activeView);panel2&&this.setActive(panel2)}this._onDidLayoutfromJSON.fire()}clear(){for(const disposable of this._panels.values())disposable.dispose();for(this._panels.clear();this.splitview.length>0;)this.splitview.removeView(0,Sizing.Distribute,!0).dispose()}dispose(){for(const disposable of this._panels.values())disposable.dispose();this._panels.clear();const views=this.splitview.getViews();this._splitviewChangeDisposable.dispose(),this.splitview.dispose();for(const view of views)view.dispose();this.element.remove(),super.dispose()}}class DefaultHeader extends CompositeDisposable{get element(){return this._element}constructor(){super(),this._expandedIcon=createExpandMoreButton(),this._collapsedIcon=createChevronRightButton(),this.disposable=new MutableDisposable,this.apiRef={api:null},this._element=document.createElement("div"),this.element.className="dv-default-header",this._content=document.createElement("span"),this._expander=document.createElement("div"),this._expander.className="dv-pane-header-icon",this.element.appendChild(this._expander),this.element.appendChild(this._content),this.addDisposables(addDisposableListener(this._element,"click",()=>{var _a;(_a=this.apiRef.api)===null||_a===void 0||_a.setExpanded(!this.apiRef.api.isExpanded)}))}init(params){this.apiRef.api=params.api,this._content.textContent=params.title,this.updateIcon(),this.disposable.value=params.api.onDidExpansionChange(()=>{this.updateIcon()})}updateIcon(){var _a;const isExpanded=!!(!((_a=this.apiRef.api)===null||_a===void 0)&&_a.isExpanded);toggleClass(this._expander,"collapsed",!isExpanded),isExpanded?(this._expander.contains(this._collapsedIcon)&&this._collapsedIcon.remove(),this._expander.contains(this._expandedIcon)||this._expander.appendChild(this._expandedIcon)):(this._expander.contains(this._expandedIcon)&&this._expandedIcon.remove(),this._expander.contains(this._collapsedIcon)||this._expander.appendChild(this._collapsedIcon))}update(_params){}dispose(){this.disposable.dispose(),super.dispose()}}const nextLayoutId=sequentialNumberGenerator(),HEADER_SIZE=22,MINIMUM_BODY_SIZE=0,MAXIMUM_BODY_SIZE=Number.MAX_SAFE_INTEGER;class PaneFramework extends DraggablePaneviewPanel{constructor(options){super({accessor:options.accessor,id:options.id,component:options.component,headerComponent:options.headerComponent,orientation:options.orientation,isExpanded:options.isExpanded,disableDnd:options.disableDnd,headerSize:options.headerSize,minimumBodySize:options.minimumBodySize,maximumBodySize:options.maximumBodySize}),this.options=options}getBodyComponent(){return this.options.body}getHeaderComponent(){return this.options.header}}class PaneviewComponent extends Resizable{get id(){return this._id}get panels(){return this.paneview.getPanes()}set paneview(value2){this._paneview=value2,this._disposable.value=new CompositeDisposable(this._paneview.onDidChange(()=>{this._onDidLayoutChange.fire(void 0)}),this._paneview.onDidAddView(e=>this._onDidAddView.fire(e)),this._paneview.onDidRemoveView(e=>this._onDidRemoveView.fire(e)))}get paneview(){return this._paneview}get minimumSize(){return this.paneview.minimumSize}get maximumSize(){return this.paneview.maximumSize}get height(){return this.paneview.orientation===Orientation.HORIZONTAL?this.paneview.orthogonalSize:this.paneview.size}get width(){return this.paneview.orientation===Orientation.HORIZONTAL?this.paneview.size:this.paneview.orthogonalSize}get options(){return this._options}constructor(container2,options){var _a;super(document.createElement("div"),options.disableAutoResizing),this._id=nextLayoutId.next(),this._disposable=new MutableDisposable,this._viewDisposables=new Map,this._onDidLayoutfromJSON=new Emitter,this.onDidLayoutFromJSON=this._onDidLayoutfromJSON.event,this._onDidLayoutChange=new Emitter,this.onDidLayoutChange=this._onDidLayoutChange.event,this._onDidDrop=new Emitter,this.onDidDrop=this._onDidDrop.event,this._onDidAddView=new Emitter,this.onDidAddView=this._onDidAddView.event,this._onDidRemoveView=new Emitter,this.onDidRemoveView=this._onDidRemoveView.event,this._onUnhandledDragOverEvent=new Emitter,this.onUnhandledDragOverEvent=this._onUnhandledDragOverEvent.event,this.element.style.height="100%",this.element.style.width="100%",this.addDisposables(this._onDidLayoutChange,this._onDidLayoutfromJSON,this._onDidDrop,this._onDidAddView,this._onDidRemoveView,this._onUnhandledDragOverEvent),this._classNames=new Classnames(this.element),this._classNames.setClassNames((_a=options.className)!==null&&_a!==void 0?_a:""),container2.appendChild(this.element),this._options=options,this.paneview=new Paneview(this.element,{orientation:Orientation.VERTICAL}),this.addDisposables(this._disposable)}setVisible(panel2,visible){const index=this.panels.indexOf(panel2);this.paneview.setViewVisible(index,visible)}focus(){}updateOptions(options){var _a,_b;"className"in options&&this._classNames.setClassNames((_a=options.className)!==null&&_a!==void 0?_a:""),"disableResizing"in options&&(this.disableResizing=(_b=options.disableAutoResizing)!==null&&_b!==void 0?_b:!1),this._options=Object.assign(Object.assign({},this.options),options)}addPanel(options){var _a,_b;const body=this.options.createComponent({id:options.id,name:options.component});let header2;options.headerComponent&&this.options.createHeaderComponent&&(header2=this.options.createHeaderComponent({id:options.id,name:options.headerComponent})),header2||(header2=new DefaultHeader);const view=new PaneFramework({id:options.id,component:options.component,headerComponent:options.headerComponent,header:header2,body,orientation:Orientation.VERTICAL,isExpanded:!!options.isExpanded,disableDnd:!!this.options.disableDnd,accessor:this,headerSize:(_a=options.headerSize)!==null&&_a!==void 0?_a:HEADER_SIZE,minimumBodySize:MINIMUM_BODY_SIZE,maximumBodySize:MAXIMUM_BODY_SIZE});this.doAddPanel(view);const size=typeof options.size=="number"?options.size:Sizing.Distribute,index=typeof options.index=="number"?options.index:void 0;return view.init({params:(_b=options.params)!==null&&_b!==void 0?_b:{},minimumBodySize:options.minimumBodySize,maximumBodySize:options.maximumBodySize,isExpanded:options.isExpanded,title:options.title,containerApi:new PaneviewApi(this),accessor:this}),this.paneview.addPane(view,size,index),view.orientation=this.paneview.orientation,view}removePanel(panel2){const index=this.panels.findIndex(_=>_===panel2);this.paneview.removePane(index),this.doRemovePanel(panel2)}movePanel(from,to){this.paneview.moveView(from,to)}getPanel(id){return this.panels.find(view=>view.id===id)}layout(width,height){const[size,orthogonalSize]=this.paneview.orientation===Orientation.HORIZONTAL?[width,height]:[height,width];this.paneview.layout(size,orthogonalSize)}toJSON(){const maximum=value2=>value2===Number.MAX_SAFE_INTEGER||value2===Number.POSITIVE_INFINITY?void 0:value2,minimum=value2=>value2<=0?void 0:value2;return{views:this.paneview.getPanes().map((view,i)=>({size:this.paneview.getViewSize(i),data:view.toJSON(),minimumSize:minimum(view.minimumBodySize),maximumSize:maximum(view.maximumBodySize),headerSize:view.headerSize,expanded:view.isExpanded()})),size:this.paneview.size}}fromJSON(serializedPaneview){this.clear();const{views,size}=serializedPaneview,queue=[],width=this.width,height=this.height;this.paneview=new Paneview(this.element,{orientation:Orientation.VERTICAL,descriptor:{size,views:views.map(view=>{var _a,_b,_c;const data=view.data,body=this.options.createComponent({id:data.id,name:data.component});let header2;data.headerComponent&&this.options.createHeaderComponent&&(header2=this.options.createHeaderComponent({id:data.id,name:data.headerComponent})),header2||(header2=new DefaultHeader);const panel2=new PaneFramework({id:data.id,component:data.component,headerComponent:data.headerComponent,header:header2,body,orientation:Orientation.VERTICAL,isExpanded:!!view.expanded,disableDnd:!!this.options.disableDnd,accessor:this,headerSize:(_a=view.headerSize)!==null&&_a!==void 0?_a:HEADER_SIZE,minimumBodySize:(_b=view.minimumSize)!==null&&_b!==void 0?_b:MINIMUM_BODY_SIZE,maximumBodySize:(_c=view.maximumSize)!==null&&_c!==void 0?_c:MAXIMUM_BODY_SIZE});return this.doAddPanel(panel2),queue.push(()=>{var _a2;panel2.init({params:(_a2=data.params)!==null&&_a2!==void 0?_a2:{},minimumBodySize:view.minimumSize,maximumBodySize:view.maximumSize,title:data.title,isExpanded:!!view.expanded,containerApi:new PaneviewApi(this),accessor:this}),panel2.orientation=this.paneview.orientation}),setTimeout(()=>{this._onDidAddView.fire(panel2)},0),{size:view.size,view:panel2}})}}),this.layout(width,height),queue.forEach(f=>f()),this._onDidLayoutfromJSON.fire()}clear(){for(const[_,value2]of this._viewDisposables.entries())value2.dispose();this._viewDisposables.clear(),this.paneview.dispose()}doAddPanel(panel2){const disposable=new CompositeDisposable(panel2.onDidDrop(event=>{this._onDidDrop.fire(event)}),panel2.onUnhandledDragOverEvent(event=>{this._onUnhandledDragOverEvent.fire(event)}));this._viewDisposables.set(panel2.id,disposable)}doRemovePanel(panel2){const disposable=this._viewDisposables.get(panel2.id);disposable&&(disposable.dispose(),this._viewDisposables.delete(panel2.id))}dispose(){super.dispose();for(const[_,value2]of this._viewDisposables.entries())value2.dispose();this._viewDisposables.clear(),this.element.remove(),this.paneview.dispose()}}class SplitviewPanel extends BasePanelView{get priority(){return this._priority}set orientation(value2){this._orientation=value2}get orientation(){return this._orientation}get minimumSize(){const size=typeof this._minimumSize=="function"?this._minimumSize():this._minimumSize;return size!==this._evaluatedMinimumSize&&(this._evaluatedMinimumSize=size,this.updateConstraints()),size}get maximumSize(){const size=typeof this._maximumSize=="function"?this._maximumSize():this._maximumSize;return size!==this._evaluatedMaximumSize&&(this._evaluatedMaximumSize=size,this.updateConstraints()),size}get snap(){return this._snap}constructor(id,componentName){super(id,componentName,new SplitviewPanelApiImpl(id,componentName)),this._evaluatedMinimumSize=0,this._evaluatedMaximumSize=Number.POSITIVE_INFINITY,this._minimumSize=0,this._maximumSize=Number.POSITIVE_INFINITY,this._snap=!1,this._onDidChange=new Emitter,this.onDidChange=this._onDidChange.event,this.api.initialize(this),this.addDisposables(this._onDidChange,this.api.onWillVisibilityChange(event=>{const{isVisible}=event,{accessor}=this._params;accessor.setVisible(this,isVisible)}),this.api.onActiveChange(()=>{const{accessor}=this._params;accessor.setActive(this)}),this.api.onDidConstraintsChangeInternal(event=>{(typeof event.minimumSize=="number"||typeof event.minimumSize=="function")&&(this._minimumSize=event.minimumSize),(typeof event.maximumSize=="number"||typeof event.maximumSize=="function")&&(this._maximumSize=event.maximumSize),this.updateConstraints()}),this.api.onDidSizeChange(event=>{this._onDidChange.fire({size:event.size})}))}setVisible(isVisible){this.api._onDidVisibilityChange.fire({isVisible})}setActive(isActive){this.api._onDidActiveChange.fire({isActive})}layout(size,orthogonalSize){const[width,height]=this.orientation===Orientation.HORIZONTAL?[size,orthogonalSize]:[orthogonalSize,size];super.layout(width,height)}init(parameters){super.init(parameters),this._priority=parameters.priority,parameters.minimumSize&&(this._minimumSize=parameters.minimumSize),parameters.maximumSize&&(this._maximumSize=parameters.maximumSize),parameters.snap&&(this._snap=parameters.snap)}toJSON(){const maximum=value2=>value2===Number.MAX_SAFE_INTEGER||value2===Number.POSITIVE_INFINITY?void 0:value2,minimum=value2=>value2<=0?void 0:value2;return Object.assign(Object.assign({},super.toJSON()),{minimumSize:minimum(this.minimumSize),maximumSize:maximum(this.maximumSize)})}updateConstraints(){this.api._onDidConstraintsChange.fire({maximumSize:this._evaluatedMaximumSize,minimumSize:this._evaluatedMinimumSize})}}function createDockview(element,options){return new DockviewComponent(element,options).api}function createSplitview(element,options){const component=new SplitviewComponent(element,options);return new SplitviewApi(component)}function createGridview(element,options){const component=new GridviewComponent(element,options);return new GridviewApi(component)}function createPaneview(element,options){const component=new PaneviewComponent(element,options);return new PaneviewApi(component)}/**
 * dockview
 * @version 5.2.0
 * @link https://github.com/mathuo/dockview
 * @license MIT
 */function styleInject(css,ref){ref===void 0&&(ref={});var insertAt=ref.insertAt;if(!(typeof document>"u")){var head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style");style.type="text/css",insertAt==="top"&&head.firstChild?head.insertBefore(style,head.firstChild):head.appendChild(style),style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css))}}var css_248z=`.dv-scrollable {
  position: relative;
  overflow: hidden;
}
.dv-scrollable .dv-scrollbar {
  position: absolute;
  border-radius: 2px;
  background-color: transparent;
  /* GPU optimizations */
  will-change: background-color, transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 1s;
  transition-delay: 0s;
}
.dv-scrollable .dv-scrollbar-horizontal {
  bottom: 0px;
  left: 0px;
  height: 4px;
}
.dv-scrollable .dv-scrollbar-vertical {
  right: 0px;
  top: 0px;
  width: 4px;
}
.dv-scrollable:hover .dv-scrollbar, .dv-scrollable.dv-scrollable-resizing .dv-scrollbar, .dv-scrollable.dv-scrollable-scrolling .dv-scrollbar {
  background-color: var(--dv-scrollbar-background-color, rgba(255, 255, 255, 0.25));
}
.dv-svg {
  display: inline-block;
  fill: currentcolor;
  line-height: 1;
  stroke: currentcolor;
  stroke-width: 0;
}
.dockview-theme-dark {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
}
.dockview-theme-dark .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-light {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: white;
  --dv-tabs-and-actions-container-background-color: #f3f3f3;
  --dv-activegroup-visiblepanel-tab-background-color: white;
  --dv-activegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-inactivegroup-visiblepanel-tab-background-color: white;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #ececec;
  --dv-tab-divider-color: white;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(51, 51, 51, 0.7);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(51, 51, 51, 0.35);
  --dv-separator-border: rgba(128, 128, 128, 0.35);
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-vs {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #1e1e1e;
  --dv-tabs-and-actions-container-background-color: #252526;
  --dv-activegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-activegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-inactivegroup-visiblepanel-tab-background-color: #1e1e1e;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #2d2d2d;
  --dv-tab-divider-color: #1e1e1e;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: #969696;
  --dv-inactivegroup-visiblepanel-tab-color: #8f8f8f;
  --dv-inactivegroup-hiddenpanel-tab-color: #626262;
  --dv-separator-border: rgb(68, 68, 68);
  --dv-paneview-header-border-color: rgba(204, 204, 204, 0.2);
  --dv-tabs-and-actions-container-background-color: #2d2d30;
  --dv-tabs-and-actions-container-height: 20px;
  --dv-tabs-and-actions-container-font-size: 11px;
  --dv-activegroup-visiblepanel-tab-background-color: #007acc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #3f3f46;
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: white;
  --dv-inactivegroup-visiblepanel-tab-color: white;
  --dv-inactivegroup-hiddenpanel-tab-color: white;
}
.dockview-theme-vs .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-activegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-activegroup-hiddenpanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container {
  box-sizing: content-box;
  border-bottom: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-active-tab {
  border-top: 2px solid var(--dv-inactivegroup-visiblepanel-tab-background-color);
}
.dockview-theme-vs .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tab.dv-inactive-tab {
  border-top: 2px solid var(--dv-inactivegroup-hiddenpanel-tab-background-color);
}

.dockview-theme-abyss {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-color-abyss-dark: #000c18;
  --dv-color-abyss: #10192c;
  --dv-color-abyss-light: #1c1c2a;
  --dv-color-abyss-lighter: #2b2b4a;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(
      --dv-color-abyss-light
  );
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-dark
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(--dv-color-abyss);
  --dv-tab-divider-color: var(--dv-color-abyss-lighter);
  --dv-activegroup-visiblepanel-tab-color: white;
  --dv-activegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(255, 255, 255, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(255, 255, 255, 0.25);
  --dv-separator-border: var(--dv-color-abyss-lighter);
  --dv-paneview-header-border-color: var(--dv-color-abyss-lighter);
  --dv-paneview-active-outline-color: #596f99;
}
.dockview-theme-abyss .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}

.dockview-theme-dracula {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-group-view-background-color: #282a36;
  --dv-tabs-and-actions-container-background-color: #191a21;
  --dv-activegroup-visiblepanel-tab-background-color: #282a36;
  --dv-activegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-inactivegroup-visiblepanel-tab-background-color: #282a36;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #21222c;
  --dv-tab-divider-color: #191a21;
  --dv-activegroup-visiblepanel-tab-color: rgb(248, 248, 242);
  --dv-activegroup-hiddenpanel-tab-color: rgb(98, 114, 164);
  --dv-inactivegroup-visiblepanel-tab-color: rgba(248, 248, 242, 0.5);
  --dv-inactivegroup-hiddenpanel-tab-color: rgba(98, 114, 164, 0.5);
  --dv-separator-border: #bd93f9;
  --dv-paneview-header-border-color: #bd93f9;
  --dv-paneview-active-outline-color: #6272a4;
}
.dockview-theme-dracula .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  top: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #94527e;
  z-index: 999;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  position: relative;
}
.dockview-theme-dracula .dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab::after {
  position: absolute;
  left: 0px;
  bottom: 0px;
  content: "";
  width: 100%;
  height: 1px;
  background-color: #5e3d5a;
  z-index: 999;
}

.dockview-theme-replit {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  box-sizing: border-box;
  padding: 10px;
  background-color: #ebeced;
  --dv-group-view-background-color: #ebeced;
  --dv-tabs-and-actions-container-background-color: #fcfcfc;
  --dv-activegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-activegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-inactivegroup-visiblepanel-tab-background-color: #f0f1f2;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #fcfcfc;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-activegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(51, 51, 51);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(51, 51, 51);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-sash-color: #cfd1d3;
  --dv-active-sash-color: #babbbb;
}
.dockview-theme-replit .dv-drop-target-container .dv-drop-target-anchor.dv-drop-target-anchor-container-changed {
  opacity: 0;
  transition: none;
}
.dockview-theme-replit .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-replit .dv-resize-container {
  border-radius: 10px !important;
  border: none;
}
.dockview-theme-replit .dv-groupview {
  overflow: hidden;
  border-radius: 10px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container {
  border-bottom: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab {
  margin: 4px;
  border-radius: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-replit .dv-groupview .dv-tabs-and-actions-container .dv-tab:hover {
  background-color: #e4e5e6 !important;
}
.dockview-theme-replit .dv-groupview .dv-content-container {
  background-color: #fcfcfc;
}
.dockview-theme-replit .dv-groupview.dv-active-group {
  border: 1px solid rgba(128, 128, 128, 0.35);
}
.dockview-theme-replit .dv-groupview.dv-inactive-group {
  border: 1px solid transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 4px;
  width: 40px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-vertical > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled)::after {
  content: "";
  height: 40px;
  width: 4px;
  border-radius: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dv-sash-color);
  position: absolute;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active {
  background-color: transparent;
}
.dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):hover::after, .dockview-theme-replit .dv-horizontal > .dv-sash-container > .dv-sash:not(.disabled):active::after {
  background-color: var(--dv-active-sash-color);
}

.dockview-theme-abyss-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-color-abyss-dark: rgb(11, 6, 17);
  --dv-color-abyss: #16121f;
  --dv-color-abyss-light: #201d2b;
  --dv-color-abyss-lighter: #2a2837;
  --dv-color-abyss-accent: rgb(91, 30, 207);
  --dv-color-abyss-primary-text: white;
  --dv-color-abyss-secondary-text: rgb(148, 151, 169);
  --dv-drag-over-border: 2px solid var(--dv-color-abyss-accent);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: var(--dv-color-abyss-dark);
  --dv-tabs-and-actions-container-background-color: var(--dv-color-abyss);
  --dv-activegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-activegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-inactivegroup-visiblepanel-tab-background-color: var(
      --dv-color-abyss-lighter
  );
  --dv-inactivegroup-hiddenpanel-tab-background-color: var(
      --dv-color-abyss-light
  );
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: var(--dv-color-abyss-primary-text);
  --dv-activegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-inactivegroup-visiblepanel-tab-color: var(
      --dv-color-abyss-primary-text
  );
  --dv-inactivegroup-hiddenpanel-tab-color: var(
      --dv-color-abyss-secondary-text
  );
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: var(--dv-color-abyss-accent);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.5);
  padding: 10px;
  background-color: var(--dv-color-abyss-dark);
}
.dockview-theme-abyss-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-abyss-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-abyss-spaced .dv-tabs-overflow-container,
.dockview-theme-abyss-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-abyss-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-abyss-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-abyss-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-abyss-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-abyss-spaced .dv-resize-container .dv-groupview {
  border: 2px solid var(--dv-color-abyss-dark);
}

.dockview-theme-light-spaced {
  --dv-paneview-active-outline-color: dodgerblue;
  --dv-tabs-and-actions-container-font-size: 13px;
  --dv-tabs-and-actions-container-height: 35px;
  --dv-drag-over-background-color: rgba(83, 89, 93, 0.5);
  --dv-drag-over-border-color: transparent;
  --dv-tabs-container-scrollbar-color: #888;
  --dv-icon-hover-background-color: rgba(90, 93, 94, 0.31);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(83, 89, 93, 0.5);
  --dv-overlay-z-index: 999;
  --dv-tab-font-size: inherit;
  --dv-border-radius: 0px;
  --dv-tab-margin: 0;
  --dv-sash-color: transparent;
  --dv-active-sash-color: transparent;
  --dv-active-sash-transition-duration: 0.1s;
  --dv-active-sash-transition-delay: 0.5s;
  --dv-tab-font-size: 12px;
  --dv-border-radius: 20px;
  --dv-tab-margin: 0.5rem 0.25rem;
  --dv-tabs-and-actions-container-height: 44px;
  --dv-border-radius: 20px;
  box-sizing: border-box;
  --dv-drag-over-border: 2px solid rgb(91, 30, 207);
  --dv-drag-over-background-color: "";
  --dv-group-view-background-color: #f6f5f9;
  --dv-tabs-and-actions-container-background-color: white;
  --dv-activegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-activegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-inactivegroup-visiblepanel-tab-background-color: #ededf0;
  --dv-inactivegroup-hiddenpanel-tab-background-color: #f9f9fa;
  --dv-tab-divider-color: transparent;
  --dv-activegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-activegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-inactivegroup-visiblepanel-tab-color: rgb(104, 107, 130);
  --dv-inactivegroup-hiddenpanel-tab-color: rgb(148, 151, 169);
  --dv-separator-border: transparent;
  --dv-paneview-header-border-color: rgb(51, 51, 51);
  --dv-active-sash-color: rgb(91, 30, 207);
  --dv-floating-box-shadow: 8px 8px 8px 0px rgba(0, 0, 0, 0.1);
  padding: 10px;
  background-color: #f6f5f9;
  --dv-scrollbar-background-color: rgba(0, 0, 0, 0.25);
}
.dockview-theme-light-spaced .dv-resize-container:has(> .dv-groupview) {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-sash {
  border-radius: 4px;
}
.dockview-theme-light-spaced .dv-drop-target-anchor {
  border-radius: calc(var(--dv-border-radius) / 4);
}
.dockview-theme-light-spaced .dv-drop-target-anchor.dv-drop-target-content {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-resize-container {
  border-radius: var(--dv-border-radius) !important;
  border: none;
}
.dockview-theme-light-spaced .dv-tabs-overflow-container,
.dockview-theme-light-spaced .dv-tabs-overflow-dropdown-default {
  border-radius: 8px;
  height: unset !important;
}
.dockview-theme-light-spaced .dv-tab {
  border-radius: 8px;
}
.dockview-theme-light-spaced .dv-tab .dv-svg {
  height: 8px;
  width: 8px;
}
.dockview-theme-light-spaced .dv-groupview {
  border-radius: var(--dv-border-radius);
}
.dockview-theme-light-spaced .dv-groupview .dv-tabs-and-actions-container {
  padding: 0px calc(var(--dv-border-radius) / 2);
}
.dockview-theme-light-spaced .dv-groupview .dv-content-container {
  background-color: var(--dv-tabs-and-actions-container-background-color);
}
.dockview-theme-light-spaced .dv-resize-container .dv-groupview {
  border: 2px solid rgba(255, 255, 255, 0.1);
}
.dv-drop-target-container {
  position: absolute;
  z-index: 9999;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  pointer-events: none;
  overflow: hidden;
  --dv-transition-duration: 300ms;
}
.dv-drop-target-container .dv-drop-target-anchor {
  position: relative;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  opacity: 1;
  /* GPU optimizations */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  contain: layout paint;
  transition: opacity var(--dv-transition-duration) ease-in, top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out;
}
.dv-drop-target {
  position: relative;
  --dv-transition-duration: 70ms;
}
.dv-drop-target > .dv-drop-target-dropzone {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  z-index: 1000;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  border: var(--dv-drag-over-border);
  background-color: var(--dv-drag-over-background-color);
  transition: top var(--dv-transition-duration) ease-out, left var(--dv-transition-duration) ease-out, width var(--dv-transition-duration) ease-out, height var(--dv-transition-duration) ease-out, opacity var(--dv-transition-duration) ease-out;
  will-change: transform;
  pointer-events: none;
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-top.dv-drop-target-small-vertical {
  border-top: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-bottom.dv-drop-target-small-vertical {
  border-bottom: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-left.dv-drop-target-small-horizontal {
  border-left: 1px solid var(--dv-drag-over-border-color);
}
.dv-drop-target > .dv-drop-target-dropzone > .dv-drop-target-selection.dv-drop-target-right.dv-drop-target-small-horizontal {
  border-right: 1px solid var(--dv-drag-over-border-color);
}
.dv-dockview {
  position: relative;
  background-color: var(--dv-group-view-background-color);
  contain: layout;
}
.dv-dockview .dv-watermark-container {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  z-index: 1;
}
.dv-dockview .dv-overlay-render-container {
  position: relative;
}

.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-active-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-active-tab {
  background-color: var(--dv-inactivegroup-visiblepanel-tab-background-color);
  color: var(--dv-inactivegroup-visiblepanel-tab-color);
}
.dv-groupview.dv-inactive-group > .dv-tabs-and-actions-container .dv-tabs-container > .dv-tab.dv-inactive-tab {
  background-color: var(--dv-inactivegroup-hiddenpanel-tab-background-color);
  color: var(--dv-inactivegroup-hiddenpanel-tab-color);
}

/**
 * when a tab is dragged we lose the above stylings because they are conditional on parent elements
 * therefore we also set some stylings for the dragging event
 **/
.dv-tab.dv-tab-dragging {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-groupview {
  display: flex;
  height: 100%;
  background-color: var(--dv-group-view-background-color);
  overflow: hidden;
  flex-direction: column;
}
.dv-groupview:focus {
  outline: none;
}
.dv-groupview > .dv-content-container {
  flex-grow: 1;
  min-height: 0;
  outline: none;
}
.dv-groupview.dv-groupview-header-bottom {
  flex-direction: column-reverse;
}
.dv-groupview.dv-groupview-header-left {
  flex-direction: row;
}
.dv-groupview.dv-groupview-header-right {
  flex-direction: row-reverse;
}
.dv-root-wrapper {
  height: 100%;
  width: 100%;
}
.dv-grid-view,
.dv-branch-node {
  height: 100%;
  width: 100%;
}
.dv-debug .dv-resize-container .dv-resize-handle-top {
  background-color: red;
}
.dv-debug .dv-resize-container .dv-resize-handle-bottom {
  background-color: green;
}
.dv-debug .dv-resize-container .dv-resize-handle-left {
  background-color: yellow;
}
.dv-debug .dv-resize-container .dv-resize-handle-right {
  background-color: blue;
}
.dv-debug .dv-resize-container .dv-resize-handle-topleft,
.dv-debug .dv-resize-container .dv-resize-handle-topright,
.dv-debug .dv-resize-container .dv-resize-handle-bottomleft,
.dv-debug .dv-resize-container .dv-resize-handle-bottomright {
  background-color: cyan;
}

.dv-resize-container {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: calc(var(--dv-overlay-z-index) - 2);
  border: 1px solid var(--dv-tab-divider-color);
  box-shadow: var(--dv-floating-box-shadow);
  /* GPU optimizations for floating group movement */
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-resize-container.dv-hidden {
  display: none;
}
.dv-resize-container.dv-resize-container-dragging {
  opacity: 0.5;
  /* Enhanced GPU acceleration during drag */
  will-change: transform, opacity;
}
.dv-resize-container .dv-resize-handle-top {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-bottom {
  height: 4px;
  width: calc(100% - 8px);
  left: 4px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ns-resize;
}
.dv-resize-container .dv-resize-handle-left {
  height: calc(100% - 8px);
  width: 4px;
  left: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-right {
  height: calc(100% - 8px);
  width: 4px;
  right: -2px;
  top: 4px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ew-resize;
}
.dv-resize-container .dv-resize-handle-topleft {
  height: 4px;
  width: 4px;
  top: -2px;
  left: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: nw-resize;
}
.dv-resize-container .dv-resize-handle-topright {
  height: 4px;
  width: 4px;
  right: -2px;
  top: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: ne-resize;
}
.dv-resize-container .dv-resize-handle-bottomleft {
  height: 4px;
  width: 4px;
  left: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: sw-resize;
}
.dv-resize-container .dv-resize-handle-bottomright {
  height: 4px;
  width: 4px;
  right: -2px;
  bottom: -2px;
  z-index: var(--dv-overlay-z-index);
  position: absolute;
  cursor: se-resize;
}
.dv-render-overlay {
  --dv-overlay-z-index: var(--dv-overlay-z-index, 999);
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  contain: layout paint;
  isolation: isolate;
  /* GPU optimizations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
}
.dv-render-overlay.dv-render-overlay-float {
  z-index: calc(var(--dv-overlay-z-index) - 1);
}

.dv-debug .dv-render-overlay {
  outline: 1px solid red;
  outline-offset: -1;
}
.dv-pane-container {
  height: 100%;
  width: 100%;
}
.dv-pane-container.dv-animated .dv-view {
  /* GPU optimizations for smooth pane animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-pane-container .dv-view {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0px !important;
}
.dv-pane-container .dv-view:not(:first-child)::before {
  background-color: transparent !important;
}
.dv-pane-container .dv-view:not(:first-child) .dv-pane > .dv-pane-header {
  border-top: 1px solid var(--dv-paneview-header-border-color);
}
.dv-pane-container .dv-view .dv-default-header {
  background-color: var(--dv-group-view-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
  display: flex;
  padding: 0px 8px;
  cursor: pointer;
}
.dv-pane-container .dv-view .dv-default-header .dv-pane-header-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dv-pane-container .dv-view .dv-default-header > span {
  padding-left: 8px;
  flex-grow: 1;
}
.dv-pane-container:first-of-type > .dv-pane > .dv-pane-header {
  border-top: none !important;
}
.dv-pane-container .dv-pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}
.dv-pane-container .dv-pane .dv-pane-header {
  box-sizing: border-box;
  user-select: none;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-header.dv-pane-draggable {
  cursor: pointer;
}
.dv-pane-container .dv-pane .dv-pane-header:focus:before, .dv-pane-container .dv-pane .dv-pane-header:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-pane-container .dv-pane .dv-pane-body {
  overflow-y: auto;
  overflow-x: hidden;
  flex-grow: 1;
  position: relative;
  outline: none;
}
.dv-pane-container .dv-pane .dv-pane-body:focus:before, .dv-pane-container .dv-pane .dv-pane-body:focus-within:before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  content: "";
  pointer-events: none;
  outline: 1px solid;
  outline-width: -1px;
  outline-style: solid;
  outline-offset: -1px;
  outline-color: var(--dv-paneview-active-outline-color);
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-enabled {
  background-color: black;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-disabled {
  background-color: orange;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-maximum {
  background-color: green;
}
.dv-debug .dv-split-view-container .dv-sash-container .dv-sash.dv-minimum {
  background-color: red;
}

.dv-split-view-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.dv-split-view-container.dv-splitview-disabled > .dv-sash-container > .dv-sash {
  pointer-events: none;
}
.dv-split-view-container.dv-animation .dv-view,
.dv-split-view-container.dv-animation .dv-sash {
  /* GPU optimizations for smooth animations */
  will-change: transform;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 0.15s ease-out;
}
.dv-split-view-container.dv-horizontal {
  height: 100%;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash {
  height: 100%;
  width: 4px;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ew-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: w-resize;
}
.dv-split-view-container.dv-horizontal > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: e-resize;
}
.dv-split-view-container.dv-horizontal > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 100%;
  width: 1px;
}
.dv-split-view-container.dv-vertical {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash {
  width: 100%;
  height: 4px;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-enabled {
  cursor: ns-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-disabled {
  cursor: default;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-maximum {
  cursor: n-resize;
}
.dv-split-view-container.dv-vertical > .dv-sash-container > .dv-sash.dv-minimum {
  cursor: s-resize;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view {
  width: 100%;
}
.dv-split-view-container.dv-vertical > .dv-view-container > .dv-view:not(:first-child)::before {
  height: 1px;
  width: 100%;
}
.dv-split-view-container .dv-sash-container {
  height: 100%;
  width: 100%;
  position: absolute;
}
.dv-split-view-container .dv-sash-container .dv-sash {
  position: absolute;
  z-index: 99;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  background-color: var(--dv-sash-color, transparent);
}
.dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):active, .dv-split-view-container .dv-sash-container .dv-sash:not(.disabled):hover {
  background-color: var(--dv-active-sash-color, transparent);
  transition-property: background-color;
  transition-timing-function: ease-in-out;
  transition-duration: var(--dv-active-sash-transition-duration, 0.1s);
  transition-delay: var(--dv-active-sash-transition-delay, 0.5s);
}
.dv-split-view-container .dv-view-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.dv-split-view-container .dv-view-container .dv-view {
  height: 100%;
  box-sizing: border-box;
  overflow: auto;
  position: absolute;
}
.dv-split-view-container.dv-separator-border .dv-view:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-separator-border);
}
.dv-dragged {
  transform: translate3d(0px, 0px, 0px); /* forces tab to be drawn on a separate layer (see https://github.com/microsoft/vscode/issues/18733) */
}

.dv-tab {
  flex-shrink: 0;
}
.dv-tab:focus-within, .dv-tab:focus {
  position: relative;
}
.dv-tab:focus-within::after, .dv-tab:focus::after {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  pointer-events: none;
  outline: 1px solid var(--dv-tab-divider-color) !important;
  outline-offset: -1px;
  z-index: 5;
}
.dv-tab.dv-tab-dragging .dv-default-tab-action {
  background-color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tab.dv-active-tab .dv-default-tab .dv-default-tab-action {
  visibility: visible;
}
.dv-tab.dv-inactive-tab .dv-default-tab .dv-default-tab-action {
  visibility: hidden;
}
.dv-tab.dv-inactive-tab .dv-default-tab:hover .dv-default-tab-action {
  visibility: visible;
}
.dv-tab .dv-default-tab {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.dv-tab .dv-default-tab .dv-default-tab-content {
  flex-grow: 1;
  margin-right: 4px;
}
.dv-tab .dv-default-tab .dv-default-tab-action {
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.dv-tab .dv-default-tab .dv-default-tab-action:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-overflow-dropdown-default {
  height: 100%;
  color: var(--dv-activegroup-hiddenpanel-tab-color);
  margin: var(--dv-tab-margin);
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
}
.dv-tabs-overflow-dropdown-default > span {
  padding-left: 0.25rem;
}
.dv-tabs-overflow-dropdown-default > svg {
  transform: rotate(90deg);
}
.dv-tabs-overflow-dropdown-default:hover {
  border-radius: 2px;
  background-color: var(--dv-icon-hover-background-color);
}
.dv-tabs-container {
  display: flex;
  height: 100%;
  overflow: auto;
  scrollbar-width: thin;
  /* GPU optimizations for smooth scrolling */
  will-change: scroll-position;
  transform: translate3d(0, 0, 0);
  /* Track */
  /* Handle */
}
.dv-tabs-container.dv-tabs-container-vertical {
  width: 100%;
  height: fit-content;
  max-height: 100%;
  writing-mode: vertical-rl;
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before, .dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  pointer-events: none;
  background-color: var(--dv-tab-divider-color);
}
.dv-tabs-container.dv-horizontal .dv-tab:not(:first-child)::before {
  width: 1px;
  height: 100%;
}
.dv-tabs-container.dv-vertical .dv-tab:not(:first-child)::before {
  width: 100%;
  height: 1px;
}
.dv-tabs-container::-webkit-scrollbar {
  height: 3px;
}
.dv-tabs-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
}

.dv-scrollable > .dv-tabs-container {
  overflow: hidden;
}

.dv-tab {
  -webkit-user-drag: element;
  outline: none;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  font-size: var(--dv-tab-font-size);
  margin: var(--dv-tab-margin);
}
.dv-tab.dv-tab--shifting {
  will-change: margin-left;
  transition: transform var(--dv-transition-duration, 200ms) ease-out, margin-left var(--dv-transition-duration, 200ms) ease-out;
}
.dv-tab.dv-tab--dragging {
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  overflow: hidden;
  opacity: 0;
  pointer-events: none;
  transition: width var(--dv-transition-duration, 200ms) ease-out, padding var(--dv-transition-duration, 200ms) ease-out, margin var(--dv-transition-duration, 200ms) ease-out, opacity var(--dv-transition-duration, 200ms) ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .dv-tab {
    transition: none !important;
  }
}
.dv-tabs-container-vertical .dv-tab {
  padding: 0.5rem 0.25rem;
}

.dv-tabs-overflow-container {
  flex-direction: column;
  height: unset;
  font-size: var(--dv-tabs-and-actions-container-font-size);
  max-height: min(50vh, 400px);
  overflow-y: auto;
  border: 1px solid var(--dv-tab-divider-color);
  background-color: var(--dv-group-view-background-color);
  /* Scrollbar styling for webkit browsers */
  /* Firefox scrollbar */
  scrollbar-width: thin;
}
.dv-tabs-overflow-container::-webkit-scrollbar {
  width: 6px;
}
.dv-tabs-overflow-container::-webkit-scrollbar-track {
  background: transparent;
}
.dv-tabs-overflow-container::-webkit-scrollbar-thumb {
  background: var(--dv-tabs-container-scrollbar-color);
  border-radius: 3px;
}
.dv-tabs-overflow-container .dv-tab:not(:last-child) {
  border-bottom: 1px solid var(--dv-tab-divider-color);
}
.dv-tabs-overflow-container .dv-active-tab {
  background-color: var(--dv-activegroup-visiblepanel-tab-background-color);
  color: var(--dv-activegroup-visiblepanel-tab-color);
}
.dv-tabs-overflow-container .dv-inactive-tab {
  background-color: var(--dv-activegroup-hiddenpanel-tab-background-color);
  color: var(--dv-activegroup-hiddenpanel-tab-color);
}
.dv-tabs-and-actions-container {
  display: flex;
  background-color: var(--dv-tabs-and-actions-container-background-color);
  flex-shrink: 0;
  box-sizing: border-box;
  height: var(--dv-tabs-and-actions-container-height);
  font-size: var(--dv-tabs-and-actions-container-font-size);
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-scrollable {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container {
  flex-grow: 1;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-tabs-container .dv-tab {
  flex-grow: 1;
  padding: 0px;
}
.dv-tabs-and-actions-container.dv-single-tab.dv-full-width-single-tab .dv-void-container {
  flex-grow: 0;
}
.dv-tabs-and-actions-container .dv-void-container {
  display: flex;
  flex-grow: 1;
}
.dv-tabs-and-actions-container .dv-void-container.dv-draggable {
  cursor: grab;
}
.dv-tabs-and-actions-container .dv-right-actions-container {
  display: flex;
}
.dv-tabs-and-actions-container .dv-right-actions-container.dv-right-actions-container-vertical {
  flex-direction: column;
}
.dv-tabs-and-actions-container.dv-groupview-header-vertical {
  flex-direction: column;
  height: auto;
  width: var(--dv-tabs-and-actions-container-height);
}
.dv-watermark {
  display: flex;
  height: 100%;
}`;styleInject(css_248z);const ReactComponentBridge=(props,ref)=>{const[_,triggerRender]=React.useState(),_props=React.useRef(props.componentProps);return React.useImperativeHandle(ref,()=>({update:componentProps=>{_props.current=Object.assign(Object.assign({},_props.current),componentProps),triggerRender(Date.now())}}),[]),React.createElement(props.component,_props.current)};ReactComponentBridge.displayName="DockviewReactJsBridge";const uniquePortalKeyGenerator=(()=>{let value2=1;return{next:()=>`dockview_react_portal_key_${(value2++).toString()}`}})(),ReactPartContext=React.createContext({});class ReactPart{constructor(parent,portalStore,component,parameters,context){this.parent=parent,this.portalStore=portalStore,this.component=component,this.parameters=parameters,this.context=context,this._initialProps={},this.disposed=!1,this.createPortal()}update(props){if(this.disposed)throw new Error("invalid operation: resource is already disposed");this.componentInstance?this.componentInstance.update(props):this._initialProps=Object.assign(Object.assign({},this._initialProps),props)}createPortal(){if(this.disposed)throw new Error("invalid operation: resource is already disposed");if(!isReactComponent(this.component))throw new Error("Dockview: Only React.memo(...), React.ForwardRef(...) and functional components are accepted as components");const bridgeComponent=React.createElement(React.forwardRef(ReactComponentBridge),{component:this.component,componentProps:this.parameters,ref:element=>{this.componentInstance=element,Object.keys(this._initialProps).length>0&&(this.componentInstance.update(this._initialProps),this._initialProps={})}}),node=this.context?React.createElement(ReactPartContext.Provider,{value:this.context},bridgeComponent):bridgeComponent,portal=ReactDOM.createPortal(node,this.parent,uniquePortalKeyGenerator.next());this.ref={portal,disposable:this.portalStore.addPortal(portal)}}dispose(){var _a;(_a=this.ref)===null||_a===void 0||_a.disposable.dispose(),this.disposed=!0}}const usePortalsLifecycle=()=>{const[portals,setPortals]=React.useState([]);React.useDebugValue(`Portal count: ${portals.length}`);const addPortal=React.useCallback(portal=>{setPortals(existingPortals=>[...existingPortals,portal]);let disposed=!1;return Disposable.from(()=>{if(disposed)throw new Error("invalid operation: resource already disposed");disposed=!0,setPortals(existingPortals=>existingPortals.filter(p=>p!==portal))})},[]);return[portals,addPortal]};function isReactComponent(component){return typeof component=="function"||!!component?.$$typeof}class ReactPanelContentPart{get element(){return this._element}constructor(id,component,reactPortalStore){this.id=id,this.component=component,this.reactPortalStore=reactPortalStore,this._onDidFocus=new Emitter,this.onDidFocus=this._onDidFocus.event,this._onDidBlur=new Emitter,this.onDidBlur=this._onDidBlur.event,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}focus(){}init(parameters){this.part=new ReactPart(this.element,this.reactPortalStore,this.component,{params:parameters.params,api:parameters.api,containerApi:parameters.containerApi})}update(event){var _a;(_a=this.part)===null||_a===void 0||_a.update({params:event.params})}layout(_width,_height){}dispose(){var _a;this._onDidFocus.dispose(),this._onDidBlur.dispose(),(_a=this.part)===null||_a===void 0||_a.dispose()}}class ReactPanelHeaderPart{get element(){return this._element}constructor(id,component,reactPortalStore){this.id=id,this.component=component,this.reactPortalStore=reactPortalStore,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}focus(){}init(parameters){this.part=new ReactPart(this.element,this.reactPortalStore,this.component,{params:parameters.params,api:parameters.api,containerApi:parameters.containerApi,tabLocation:parameters.tabLocation})}update(event){var _a;(_a=this.part)===null||_a===void 0||_a.update({params:event.params})}layout(_width,_height){}dispose(){var _a;(_a=this.part)===null||_a===void 0||_a.dispose()}}class ReactWatermarkPart{get element(){return this._element}constructor(id,component,reactPortalStore){this.id=id,this.component=component,this.reactPortalStore=reactPortalStore,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}init(parameters){this.part=new ReactPart(this.element,this.reactPortalStore,this.component,{group:parameters.group,containerApi:parameters.containerApi})}focus(){}update(params){var _a,_b,_c;this.parameters&&(this.parameters.params=params.params),(_a=this.part)===null||_a===void 0||_a.update({params:(_c=(_b=this.parameters)===null||_b===void 0?void 0:_b.params)!==null&&_c!==void 0?_c:{}})}layout(_width,_height){}dispose(){var _a;(_a=this.part)===null||_a===void 0||_a.dispose()}}class ReactHeaderActionsRendererPart{get element(){return this._element}get part(){return this._part}constructor(component,reactPortalStore,_group){this.component=component,this.reactPortalStore=reactPortalStore,this._group=_group,this.mutableDisposable=new MutableDisposable,this._element=document.createElement("div"),this._element.className="dv-react-part",this._element.style.height="100%",this._element.style.width="100%"}init(parameters){this.mutableDisposable.value=new CompositeDisposable(this._group.model.onDidAddPanel(()=>{this.updatePanels()}),this._group.model.onDidRemovePanel(()=>{this.updatePanels()}),this._group.model.onDidActivePanelChange(()=>{this.updateActivePanel()}),parameters.api.onDidActiveChange(()=>{this.updateGroupActive()})),this._part=new ReactPart(this.element,this.reactPortalStore,this.component,{api:parameters.api,containerApi:parameters.containerApi,panels:this._group.model.panels,activePanel:this._group.model.activePanel,isGroupActive:this._group.api.isActive,group:this._group,headerPosition:this._group.model.headerPosition})}dispose(){var _a;this.mutableDisposable.dispose(),(_a=this._part)===null||_a===void 0||_a.dispose()}update(event){var _a;(_a=this._part)===null||_a===void 0||_a.update(event.params)}updatePanels(){this.update({params:{panels:this._group.model.panels}})}updateActivePanel(){this.update({params:{activePanel:this._group.model.activePanel}})}updateGroupActive(){this.update({params:{isGroupActive:this._group.api.isActive}})}}function createGroupControlElement(component,store){return component?groupPanel=>new ReactHeaderActionsRendererPart(component,store,groupPanel):void 0}const DEFAULT_REACT_TAB="props.defaultTabComponent";function extractCoreOptions$3(props){return PROPERTY_KEYS_DOCKVIEW.reduce((obj,key)=>(key in props&&(obj[key]=props[key]),obj),{})}const DockviewReact=React.forwardRef((props,ref)=>{const domRef=React.useRef(null),dockviewRef=React.useRef(),[portals,addPortal]=usePortalsLifecycle();React.useImperativeHandle(ref,()=>domRef.current,[]);const prevProps=React.useRef({});return React.useEffect(()=>{const changes={};PROPERTY_KEYS_DOCKVIEW.forEach(propKey=>{const key=propKey,propValue=props[key];key in props&&propValue!==prevProps.current[key]&&(changes[key]=propValue)}),dockviewRef.current&&dockviewRef.current.updateOptions(changes),prevProps.current=props},PROPERTY_KEYS_DOCKVIEW.map(key=>props[key])),React.useEffect(()=>{var _a;if(!domRef.current)return;const frameworkTabComponents=(_a=props.tabComponents)!==null&&_a!==void 0?_a:{};props.defaultTabComponent&&(frameworkTabComponents[DEFAULT_REACT_TAB]=props.defaultTabComponent);const frameworkOptions={createLeftHeaderActionComponent:createGroupControlElement(props.leftHeaderActionsComponent,{addPortal}),createRightHeaderActionComponent:createGroupControlElement(props.rightHeaderActionsComponent,{addPortal}),createPrefixHeaderActionComponent:createGroupControlElement(props.prefixHeaderActionsComponent,{addPortal}),createComponent:options=>new ReactPanelContentPart(options.id,props.components[options.name],{addPortal}),createTabComponent(options){return new ReactPanelHeaderPart(options.id,frameworkTabComponents[options.name],{addPortal})},createWatermarkComponent:props.watermarkComponent?()=>new ReactWatermarkPart("watermark",props.watermarkComponent,{addPortal}):void 0,defaultTabComponent:props.defaultTabComponent?DEFAULT_REACT_TAB:void 0},api=createDockview(domRef.current,Object.assign(Object.assign({},extractCoreOptions$3(props)),frameworkOptions)),{clientWidth,clientHeight}=domRef.current;return api.layout(clientWidth,clientHeight),props.onReady&&props.onReady({api}),dockviewRef.current=api,()=>{dockviewRef.current=void 0,api.dispose()}},[]),React.useEffect(()=>{if(!dockviewRef.current)return()=>{};const disposable=dockviewRef.current.onDidDrop(event=>{props.onDidDrop&&props.onDidDrop(event)});return()=>{disposable.dispose()}},[props.onDidDrop]),React.useEffect(()=>{if(!dockviewRef.current)return()=>{};const disposable=dockviewRef.current.onWillDrop(event=>{props.onWillDrop&&props.onWillDrop(event)});return()=>{disposable.dispose()}},[props.onWillDrop]),React.useEffect(()=>{dockviewRef.current&&dockviewRef.current.updateOptions({createComponent:options=>new ReactPanelContentPart(options.id,props.components[options.name],{addPortal})})},[props.components]),React.useEffect(()=>{var _a;if(!dockviewRef.current)return;const frameworkTabComponents=(_a=props.tabComponents)!==null&&_a!==void 0?_a:{};props.defaultTabComponent&&(frameworkTabComponents[DEFAULT_REACT_TAB]=props.defaultTabComponent),dockviewRef.current.updateOptions({defaultTabComponent:props.defaultTabComponent?DEFAULT_REACT_TAB:void 0,createTabComponent(options){return new ReactPanelHeaderPart(options.id,frameworkTabComponents[options.name],{addPortal})}})},[props.tabComponents,props.defaultTabComponent]),React.useEffect(()=>{dockviewRef.current&&dockviewRef.current.updateOptions({createWatermarkComponent:props.watermarkComponent?()=>new ReactWatermarkPart("watermark",props.watermarkComponent,{addPortal}):void 0})},[props.watermarkComponent]),React.useEffect(()=>{dockviewRef.current&&dockviewRef.current.updateOptions({createRightHeaderActionComponent:createGroupControlElement(props.rightHeaderActionsComponent,{addPortal})})},[props.rightHeaderActionsComponent]),React.useEffect(()=>{dockviewRef.current&&dockviewRef.current.updateOptions({createLeftHeaderActionComponent:createGroupControlElement(props.leftHeaderActionsComponent,{addPortal})})},[props.leftHeaderActionsComponent]),React.useEffect(()=>{dockviewRef.current&&dockviewRef.current.updateOptions({createPrefixHeaderActionComponent:createGroupControlElement(props.prefixHeaderActionsComponent,{addPortal})})},[props.prefixHeaderActionsComponent]),React.createElement("div",{style:{height:"100%",width:"100%"},ref:domRef},portals)});DockviewReact.displayName="DockviewComponent";class ReactPanelView extends SplitviewPanel{constructor(id,component,reactComponent,reactPortalStore){super(id,component),this.reactComponent=reactComponent,this.reactPortalStore=reactPortalStore}getComponent(){var _a,_b;return new ReactPart(this.element,this.reactPortalStore,this.reactComponent,{params:(_b=(_a=this._params)===null||_a===void 0?void 0:_a.params)!==null&&_b!==void 0?_b:{},api:this.api,containerApi:new SplitviewApi(this._params.accessor)})}}function extractCoreOptions$2(props){return PROPERTY_KEYS_SPLITVIEW.reduce((obj,key)=>(key in props&&(obj[key]=props[key]),obj),{})}const SplitviewReact=React.forwardRef((props,ref)=>{const domRef=React.useRef(null),splitviewRef=React.useRef(),[portals,addPortal]=usePortalsLifecycle();React.useImperativeHandle(ref,()=>domRef.current,[]);const prevProps=React.useRef({});return React.useEffect(()=>{const changes={};PROPERTY_KEYS_SPLITVIEW.forEach(propKey=>{const key=propKey,propValue=props[key];key in props&&propValue!==prevProps.current[key]&&(changes[key]=propValue)}),splitviewRef.current&&splitviewRef.current.updateOptions(changes),prevProps.current=props},PROPERTY_KEYS_SPLITVIEW.map(key=>props[key])),React.useEffect(()=>{if(!domRef.current)return()=>{};const frameworkOptions={createComponent:options=>new ReactPanelView(options.id,options.name,props.components[options.name],{addPortal})},api=createSplitview(domRef.current,Object.assign(Object.assign({},extractCoreOptions$2(props)),frameworkOptions)),{clientWidth,clientHeight}=domRef.current;return api.layout(clientWidth,clientHeight),props.onReady&&props.onReady({api}),splitviewRef.current=api,()=>{splitviewRef.current=void 0,api.dispose()}},[]),React.useEffect(()=>{splitviewRef.current&&splitviewRef.current.updateOptions({createComponent:options=>new ReactPanelView(options.id,options.name,props.components[options.name],{addPortal})})},[props.components]),React.createElement("div",{style:{height:"100%",width:"100%"},ref:domRef},portals)});SplitviewReact.displayName="SplitviewComponent";class ReactGridPanelView extends GridviewPanel{constructor(id,component,reactComponent,reactPortalStore){super(id,component),this.reactComponent=reactComponent,this.reactPortalStore=reactPortalStore}getComponent(){var _a,_b;return new ReactPart(this.element,this.reactPortalStore,this.reactComponent,{params:(_b=(_a=this._params)===null||_a===void 0?void 0:_a.params)!==null&&_b!==void 0?_b:{},api:this.api,containerApi:new GridviewApi(this._params.accessor)})}}function extractCoreOptions$1(props){return PROPERTY_KEYS_GRIDVIEW.reduce((obj,key)=>(key in props&&(obj[key]=props[key]),obj),{})}const GridviewReact=React.forwardRef((props,ref)=>{const domRef=React.useRef(null),gridviewRef=React.useRef(),[portals,addPortal]=usePortalsLifecycle();React.useImperativeHandle(ref,()=>domRef.current,[]);const prevProps=React.useRef({});return React.useEffect(()=>{const changes={};PROPERTY_KEYS_GRIDVIEW.forEach(propKey=>{const key=propKey,propValue=props[key];key in props&&propValue!==prevProps.current[key]&&(changes[key]=propValue)}),gridviewRef.current&&gridviewRef.current.updateOptions(changes),prevProps.current=props},PROPERTY_KEYS_GRIDVIEW.map(key=>props[key])),React.useEffect(()=>{if(!domRef.current)return()=>{};const frameworkOptions={createComponent:options=>new ReactGridPanelView(options.id,options.name,props.components[options.name],{addPortal})},api=createGridview(domRef.current,Object.assign(Object.assign({},extractCoreOptions$1(props)),frameworkOptions)),{clientWidth,clientHeight}=domRef.current;return api.layout(clientWidth,clientHeight),props.onReady&&props.onReady({api}),gridviewRef.current=api,()=>{gridviewRef.current=void 0,api.dispose()}},[]),React.useEffect(()=>{gridviewRef.current&&gridviewRef.current.updateOptions({createComponent:options=>new ReactGridPanelView(options.id,options.name,props.components[options.name],{addPortal})})},[props.components]),React.createElement("div",{style:{height:"100%",width:"100%"},ref:domRef},portals)});GridviewReact.displayName="GridviewComponent";class PanePanelSection{get element(){return this._element}constructor(id,component,reactPortalStore){this.id=id,this.component=component,this.reactPortalStore=reactPortalStore,this._element=document.createElement("div"),this._element.style.height="100%",this._element.style.width="100%"}init(parameters){this.part=new ReactPart(this.element,this.reactPortalStore,this.component,{params:parameters.params,api:parameters.api,title:parameters.title,containerApi:parameters.containerApi})}toJSON(){return{id:this.id}}update(params){var _a;(_a=this.part)===null||_a===void 0||_a.update(params.params)}dispose(){var _a;(_a=this.part)===null||_a===void 0||_a.dispose()}}function extractCoreOptions(props){return PROPERTY_KEYS_PANEVIEW.reduce((obj,key)=>(key in props&&(obj[key]=props[key]),obj),{})}const PaneviewReact=React.forwardRef((props,ref)=>{const domRef=React.useRef(null),paneviewRef=React.useRef(),[portals,addPortal]=usePortalsLifecycle();React.useImperativeHandle(ref,()=>domRef.current,[]);const prevProps=React.useRef({});return React.useEffect(()=>{const changes={};PROPERTY_KEYS_PANEVIEW.forEach(propKey=>{const key=propKey,propValue=props[key];key in props&&propValue!==prevProps.current[key]&&(changes[key]=propValue)}),paneviewRef.current&&paneviewRef.current.updateOptions(changes),prevProps.current=props},PROPERTY_KEYS_PANEVIEW.map(key=>props[key])),React.useEffect(()=>{var _a;if(!domRef.current)return()=>{};const headerComponents=(_a=props.headerComponents)!==null&&_a!==void 0?_a:{},frameworkOptions={createComponent:options=>new PanePanelSection(options.id,props.components[options.name],{addPortal}),createHeaderComponent:options=>new PanePanelSection(options.id,headerComponents[options.name],{addPortal})},api=createPaneview(domRef.current,Object.assign(Object.assign({},extractCoreOptions(props)),frameworkOptions)),{clientWidth,clientHeight}=domRef.current;return api.layout(clientWidth,clientHeight),props.onReady&&props.onReady({api}),paneviewRef.current=api,()=>{paneviewRef.current=void 0,api.dispose()}},[]),React.useEffect(()=>{paneviewRef.current&&paneviewRef.current.updateOptions({createComponent:options=>new PanePanelSection(options.id,props.components[options.name],{addPortal})})},[props.components]),React.useEffect(()=>{var _a;if(!paneviewRef.current)return;const headerComponents=(_a=props.headerComponents)!==null&&_a!==void 0?_a:{};paneviewRef.current.updateOptions({createHeaderComponent:options=>new PanePanelSection(options.id,headerComponents[options.name],{addPortal})})},[props.headerComponents]),React.useEffect(()=>{if(!paneviewRef.current)return()=>{};const disposable=paneviewRef.current.onDidDrop(event=>{props.onDidDrop&&props.onDidDrop(event)});return()=>{disposable.dispose()}},[props.onDidDrop]),React.createElement("div",{style:{height:"100%",width:"100%"},ref:domRef},portals)});PaneviewReact.displayName="PaneviewComponent";const useStreamingModeInfo=mode=>reactExports.useMemo(()=>{const isConnecting=mode===StreamingMode.WAITING_FOR_VOCGA||mode===StreamingMode.CONNECTING,isDisconnected=mode===StreamingMode.CLOSED||mode===StreamingMode.INITIAL,isBlocked=mode===StreamingMode.AUTOPLAY_BLOCKED,isLoading=isConnecting||isBlocked,isPlaying=mode===StreamingMode.OPEN;return{isConnecting,isDisconnected,isBlocked,isLoading,isPlaying}},[mode]);var __defProp=Object.defineProperty,__getOwnPropSymbols=Object.getOwnPropertySymbols,__hasOwnProp=Object.prototype.hasOwnProperty,__propIsEnum=Object.prototype.propertyIsEnumerable,__defNormalProp=(obj,key,value2)=>key in obj?__defProp(obj,key,{enumerable:!0,configurable:!0,writable:!0,value:value2}):obj[key]=value2,__spreadValues=(a,b)=>{for(var prop in b||(b={}))__hasOwnProp.call(b,prop)&&__defNormalProp(a,prop,b[prop]);if(__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(b))__propIsEnum.call(b,prop)&&__defNormalProp(a,prop,b[prop]);return a},__objRest=(source,exclude)=>{var target={};for(var prop in source)__hasOwnProp.call(source,prop)&&exclude.indexOf(prop)<0&&(target[prop]=source[prop]);if(source!=null&&__getOwnPropSymbols)for(var prop of __getOwnPropSymbols(source))exclude.indexOf(prop)<0&&__propIsEnum.call(source,prop)&&(target[prop]=source[prop]);return target};/**
 * @license QR Code generator library (TypeScript)
 * Copyright (c) Project Nayuki.
 * SPDX-License-Identifier: MIT
 */var qrcodegen;(qrcodegen2=>{const _QrCode=class _QrCode2{constructor(version,errorCorrectionLevel,dataCodewords,msk){if(this.version=version,this.errorCorrectionLevel=errorCorrectionLevel,this.modules=[],this.isFunction=[],version<_QrCode2.MIN_VERSION||version>_QrCode2.MAX_VERSION)throw new RangeError("Version value out of range");if(msk<-1||msk>7)throw new RangeError("Mask value out of range");this.size=version*4+17;let row2=[];for(let i=0;i<this.size;i++)row2.push(!1);for(let i=0;i<this.size;i++)this.modules.push(row2.slice()),this.isFunction.push(row2.slice());this.drawFunctionPatterns();const allCodewords=this.addEccAndInterleave(dataCodewords);if(this.drawCodewords(allCodewords),msk==-1){let minPenalty=1e9;for(let i=0;i<8;i++){this.applyMask(i),this.drawFormatBits(i);const penalty=this.getPenaltyScore();penalty<minPenalty&&(msk=i,minPenalty=penalty),this.applyMask(i)}}assert(0<=msk&&msk<=7),this.mask=msk,this.applyMask(msk),this.drawFormatBits(msk),this.isFunction=[]}static encodeText(text,ecl){const segs=qrcodegen2.QrSegment.makeSegments(text);return _QrCode2.encodeSegments(segs,ecl)}static encodeBinary(data,ecl){const seg=qrcodegen2.QrSegment.makeBytes(data);return _QrCode2.encodeSegments([seg],ecl)}static encodeSegments(segs,ecl,minVersion=1,maxVersion=40,mask=-1,boostEcl=!0){if(!(_QrCode2.MIN_VERSION<=minVersion&&minVersion<=maxVersion&&maxVersion<=_QrCode2.MAX_VERSION)||mask<-1||mask>7)throw new RangeError("Invalid value");let version,dataUsedBits;for(version=minVersion;;version++){const dataCapacityBits2=_QrCode2.getNumDataCodewords(version,ecl)*8,usedBits=QrSegment.getTotalBits(segs,version);if(usedBits<=dataCapacityBits2){dataUsedBits=usedBits;break}if(version>=maxVersion)throw new RangeError("Data too long")}for(const newEcl of[_QrCode2.Ecc.MEDIUM,_QrCode2.Ecc.QUARTILE,_QrCode2.Ecc.HIGH])boostEcl&&dataUsedBits<=_QrCode2.getNumDataCodewords(version,newEcl)*8&&(ecl=newEcl);let bb=[];for(const seg of segs){appendBits(seg.mode.modeBits,4,bb),appendBits(seg.numChars,seg.mode.numCharCountBits(version),bb);for(const b of seg.getData())bb.push(b)}assert(bb.length==dataUsedBits);const dataCapacityBits=_QrCode2.getNumDataCodewords(version,ecl)*8;assert(bb.length<=dataCapacityBits),appendBits(0,Math.min(4,dataCapacityBits-bb.length),bb),appendBits(0,(8-bb.length%8)%8,bb),assert(bb.length%8==0);for(let padByte=236;bb.length<dataCapacityBits;padByte^=253)appendBits(padByte,8,bb);let dataCodewords=[];for(;dataCodewords.length*8<bb.length;)dataCodewords.push(0);return bb.forEach((b,i)=>dataCodewords[i>>>3]|=b<<7-(i&7)),new _QrCode2(version,ecl,dataCodewords,mask)}getModule(x,y){return 0<=x&&x<this.size&&0<=y&&y<this.size&&this.modules[y][x]}getModules(){return this.modules}drawFunctionPatterns(){for(let i=0;i<this.size;i++)this.setFunctionModule(6,i,i%2==0),this.setFunctionModule(i,6,i%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const alignPatPos=this.getAlignmentPatternPositions(),numAlign=alignPatPos.length;for(let i=0;i<numAlign;i++)for(let j=0;j<numAlign;j++)i==0&&j==0||i==0&&j==numAlign-1||i==numAlign-1&&j==0||this.drawAlignmentPattern(alignPatPos[i],alignPatPos[j]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(mask){const data=this.errorCorrectionLevel.formatBits<<3|mask;let rem=data;for(let i=0;i<10;i++)rem=rem<<1^(rem>>>9)*1335;const bits=(data<<10|rem)^21522;assert(bits>>>15==0);for(let i=0;i<=5;i++)this.setFunctionModule(8,i,getBit(bits,i));this.setFunctionModule(8,7,getBit(bits,6)),this.setFunctionModule(8,8,getBit(bits,7)),this.setFunctionModule(7,8,getBit(bits,8));for(let i=9;i<15;i++)this.setFunctionModule(14-i,8,getBit(bits,i));for(let i=0;i<8;i++)this.setFunctionModule(this.size-1-i,8,getBit(bits,i));for(let i=8;i<15;i++)this.setFunctionModule(8,this.size-15+i,getBit(bits,i));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let rem=this.version;for(let i=0;i<12;i++)rem=rem<<1^(rem>>>11)*7973;const bits=this.version<<12|rem;assert(bits>>>18==0);for(let i=0;i<18;i++){const color=getBit(bits,i),a=this.size-11+i%3,b=Math.floor(i/3);this.setFunctionModule(a,b,color),this.setFunctionModule(b,a,color)}}drawFinderPattern(x,y){for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const dist=Math.max(Math.abs(dx),Math.abs(dy)),xx=x+dx,yy=y+dy;0<=xx&&xx<this.size&&0<=yy&&yy<this.size&&this.setFunctionModule(xx,yy,dist!=2&&dist!=4)}}drawAlignmentPattern(x,y){for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)this.setFunctionModule(x+dx,y+dy,Math.max(Math.abs(dx),Math.abs(dy))!=1)}setFunctionModule(x,y,isDark){this.modules[y][x]=isDark,this.isFunction[y][x]=!0}addEccAndInterleave(data){const ver=this.version,ecl=this.errorCorrectionLevel;if(data.length!=_QrCode2.getNumDataCodewords(ver,ecl))throw new RangeError("Invalid argument");const numBlocks=_QrCode2.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver],blockEccLen=_QrCode2.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver],rawCodewords=Math.floor(_QrCode2.getNumRawDataModules(ver)/8),numShortBlocks=numBlocks-rawCodewords%numBlocks,shortBlockLen=Math.floor(rawCodewords/numBlocks);let blocks=[];const rsDiv=_QrCode2.reedSolomonComputeDivisor(blockEccLen);for(let i=0,k=0;i<numBlocks;i++){let dat=data.slice(k,k+shortBlockLen-blockEccLen+(i<numShortBlocks?0:1));k+=dat.length;const ecc=_QrCode2.reedSolomonComputeRemainder(dat,rsDiv);i<numShortBlocks&&dat.push(0),blocks.push(dat.concat(ecc))}let result=[];for(let i=0;i<blocks[0].length;i++)blocks.forEach((block,j)=>{(i!=shortBlockLen-blockEccLen||j>=numShortBlocks)&&result.push(block[i])});return assert(result.length==rawCodewords),result}drawCodewords(data){if(data.length!=Math.floor(_QrCode2.getNumRawDataModules(this.version)/8))throw new RangeError("Invalid argument");let i=0;for(let right=this.size-1;right>=1;right-=2){right==6&&(right=5);for(let vert=0;vert<this.size;vert++)for(let j=0;j<2;j++){const x=right-j,y=(right+1&2)==0?this.size-1-vert:vert;!this.isFunction[y][x]&&i<data.length*8&&(this.modules[y][x]=getBit(data[i>>>3],7-(i&7)),i++)}}assert(i==data.length*8)}applyMask(mask){if(mask<0||mask>7)throw new RangeError("Mask value out of range");for(let y=0;y<this.size;y++)for(let x=0;x<this.size;x++){let invert;switch(mask){case 0:invert=(x+y)%2==0;break;case 1:invert=y%2==0;break;case 2:invert=x%3==0;break;case 3:invert=(x+y)%3==0;break;case 4:invert=(Math.floor(x/3)+Math.floor(y/2))%2==0;break;case 5:invert=x*y%2+x*y%3==0;break;case 6:invert=(x*y%2+x*y%3)%2==0;break;case 7:invert=((x+y)%2+x*y%3)%2==0;break;default:throw new Error("Unreachable")}!this.isFunction[y][x]&&invert&&(this.modules[y][x]=!this.modules[y][x])}}getPenaltyScore(){let result=0;for(let y=0;y<this.size;y++){let runColor=!1,runX=0,runHistory=[0,0,0,0,0,0,0];for(let x=0;x<this.size;x++)this.modules[y][x]==runColor?(runX++,runX==5?result+=_QrCode2.PENALTY_N1:runX>5&&result++):(this.finderPenaltyAddHistory(runX,runHistory),runColor||(result+=this.finderPenaltyCountPatterns(runHistory)*_QrCode2.PENALTY_N3),runColor=this.modules[y][x],runX=1);result+=this.finderPenaltyTerminateAndCount(runColor,runX,runHistory)*_QrCode2.PENALTY_N3}for(let x=0;x<this.size;x++){let runColor=!1,runY=0,runHistory=[0,0,0,0,0,0,0];for(let y=0;y<this.size;y++)this.modules[y][x]==runColor?(runY++,runY==5?result+=_QrCode2.PENALTY_N1:runY>5&&result++):(this.finderPenaltyAddHistory(runY,runHistory),runColor||(result+=this.finderPenaltyCountPatterns(runHistory)*_QrCode2.PENALTY_N3),runColor=this.modules[y][x],runY=1);result+=this.finderPenaltyTerminateAndCount(runColor,runY,runHistory)*_QrCode2.PENALTY_N3}for(let y=0;y<this.size-1;y++)for(let x=0;x<this.size-1;x++){const color=this.modules[y][x];color==this.modules[y][x+1]&&color==this.modules[y+1][x]&&color==this.modules[y+1][x+1]&&(result+=_QrCode2.PENALTY_N2)}let dark=0;for(const row2 of this.modules)dark=row2.reduce((sum,color)=>sum+(color?1:0),dark);const total=this.size*this.size,k=Math.ceil(Math.abs(dark*20-total*10)/total)-1;return assert(0<=k&&k<=9),result+=k*_QrCode2.PENALTY_N4,assert(0<=result&&result<=2568888),result}getAlignmentPatternPositions(){if(this.version==1)return[];{const numAlign=Math.floor(this.version/7)+2,step=this.version==32?26:Math.ceil((this.version*4+4)/(numAlign*2-2))*2;let result=[6];for(let pos=this.size-7;result.length<numAlign;pos-=step)result.splice(1,0,pos);return result}}static getNumRawDataModules(ver){if(ver<_QrCode2.MIN_VERSION||ver>_QrCode2.MAX_VERSION)throw new RangeError("Version number out of range");let result=(16*ver+128)*ver+64;if(ver>=2){const numAlign=Math.floor(ver/7)+2;result-=(25*numAlign-10)*numAlign-55,ver>=7&&(result-=36)}return assert(208<=result&&result<=29648),result}static getNumDataCodewords(ver,ecl){return Math.floor(_QrCode2.getNumRawDataModules(ver)/8)-_QrCode2.ECC_CODEWORDS_PER_BLOCK[ecl.ordinal][ver]*_QrCode2.NUM_ERROR_CORRECTION_BLOCKS[ecl.ordinal][ver]}static reedSolomonComputeDivisor(degree){if(degree<1||degree>255)throw new RangeError("Degree out of range");let result=[];for(let i=0;i<degree-1;i++)result.push(0);result.push(1);let root=1;for(let i=0;i<degree;i++){for(let j=0;j<result.length;j++)result[j]=_QrCode2.reedSolomonMultiply(result[j],root),j+1<result.length&&(result[j]^=result[j+1]);root=_QrCode2.reedSolomonMultiply(root,2)}return result}static reedSolomonComputeRemainder(data,divisor){let result=divisor.map(_=>0);for(const b of data){const factor=b^result.shift();result.push(0),divisor.forEach((coef,i)=>result[i]^=_QrCode2.reedSolomonMultiply(coef,factor))}return result}static reedSolomonMultiply(x,y){if(x>>>8||y>>>8)throw new RangeError("Byte out of range");let z=0;for(let i=7;i>=0;i--)z=z<<1^(z>>>7)*285,z^=(y>>>i&1)*x;return assert(z>>>8==0),z}finderPenaltyCountPatterns(runHistory){const n=runHistory[1];assert(n<=this.size*3);const core=n>0&&runHistory[2]==n&&runHistory[3]==n*3&&runHistory[4]==n&&runHistory[5]==n;return(core&&runHistory[0]>=n*4&&runHistory[6]>=n?1:0)+(core&&runHistory[6]>=n*4&&runHistory[0]>=n?1:0)}finderPenaltyTerminateAndCount(currentRunColor,currentRunLength,runHistory){return currentRunColor&&(this.finderPenaltyAddHistory(currentRunLength,runHistory),currentRunLength=0),currentRunLength+=this.size,this.finderPenaltyAddHistory(currentRunLength,runHistory),this.finderPenaltyCountPatterns(runHistory)}finderPenaltyAddHistory(currentRunLength,runHistory){runHistory[0]==0&&(currentRunLength+=this.size),runHistory.pop(),runHistory.unshift(currentRunLength)}};_QrCode.MIN_VERSION=1,_QrCode.MAX_VERSION=40,_QrCode.PENALTY_N1=3,_QrCode.PENALTY_N2=3,_QrCode.PENALTY_N3=40,_QrCode.PENALTY_N4=10,_QrCode.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],_QrCode.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],qrcodegen2.QrCode=_QrCode;function appendBits(val,len,bb){if(len<0||len>31||val>>>len)throw new RangeError("Value out of range");for(let i=len-1;i>=0;i--)bb.push(val>>>i&1)}function getBit(x,i){return(x>>>i&1)!=0}function assert(cond){if(!cond)throw new Error("Assertion error")}const _QrSegment=class _QrSegment2{constructor(mode,numChars,bitData){if(this.mode=mode,this.numChars=numChars,this.bitData=bitData,numChars<0)throw new RangeError("Invalid argument");this.bitData=bitData.slice()}static makeBytes(data){let bb=[];for(const b of data)appendBits(b,8,bb);return new _QrSegment2(_QrSegment2.Mode.BYTE,data.length,bb)}static makeNumeric(digits){if(!_QrSegment2.isNumeric(digits))throw new RangeError("String contains non-numeric characters");let bb=[];for(let i=0;i<digits.length;){const n=Math.min(digits.length-i,3);appendBits(parseInt(digits.substring(i,i+n),10),n*3+1,bb),i+=n}return new _QrSegment2(_QrSegment2.Mode.NUMERIC,digits.length,bb)}static makeAlphanumeric(text){if(!_QrSegment2.isAlphanumeric(text))throw new RangeError("String contains unencodable characters in alphanumeric mode");let bb=[],i;for(i=0;i+2<=text.length;i+=2){let temp=_QrSegment2.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i))*45;temp+=_QrSegment2.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i+1)),appendBits(temp,11,bb)}return i<text.length&&appendBits(_QrSegment2.ALPHANUMERIC_CHARSET.indexOf(text.charAt(i)),6,bb),new _QrSegment2(_QrSegment2.Mode.ALPHANUMERIC,text.length,bb)}static makeSegments(text){return text==""?[]:_QrSegment2.isNumeric(text)?[_QrSegment2.makeNumeric(text)]:_QrSegment2.isAlphanumeric(text)?[_QrSegment2.makeAlphanumeric(text)]:[_QrSegment2.makeBytes(_QrSegment2.toUtf8ByteArray(text))]}static makeEci(assignVal){let bb=[];if(assignVal<0)throw new RangeError("ECI assignment value out of range");if(assignVal<128)appendBits(assignVal,8,bb);else if(assignVal<16384)appendBits(2,2,bb),appendBits(assignVal,14,bb);else if(assignVal<1e6)appendBits(6,3,bb),appendBits(assignVal,21,bb);else throw new RangeError("ECI assignment value out of range");return new _QrSegment2(_QrSegment2.Mode.ECI,0,bb)}static isNumeric(text){return _QrSegment2.NUMERIC_REGEX.test(text)}static isAlphanumeric(text){return _QrSegment2.ALPHANUMERIC_REGEX.test(text)}getData(){return this.bitData.slice()}static getTotalBits(segs,version){let result=0;for(const seg of segs){const ccbits=seg.mode.numCharCountBits(version);if(seg.numChars>=1<<ccbits)return 1/0;result+=4+ccbits+seg.bitData.length}return result}static toUtf8ByteArray(str){str=encodeURI(str);let result=[];for(let i=0;i<str.length;i++)str.charAt(i)!="%"?result.push(str.charCodeAt(i)):(result.push(parseInt(str.substring(i+1,i+3),16)),i+=2);return result}};_QrSegment.NUMERIC_REGEX=/^[0-9]*$/,_QrSegment.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,_QrSegment.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let QrSegment=_QrSegment;qrcodegen2.QrSegment=_QrSegment})(qrcodegen||(qrcodegen={}));(qrcodegen2=>{(QrCode2=>{const _Ecc=class{constructor(ordinal,formatBits){this.ordinal=ordinal,this.formatBits=formatBits}};_Ecc.LOW=new _Ecc(0,1),_Ecc.MEDIUM=new _Ecc(1,0),_Ecc.QUARTILE=new _Ecc(2,3),_Ecc.HIGH=new _Ecc(3,2),QrCode2.Ecc=_Ecc})(qrcodegen2.QrCode||(qrcodegen2.QrCode={}))})(qrcodegen||(qrcodegen={}));(qrcodegen2=>{(QrSegment2=>{const _Mode=class{constructor(modeBits,numBitsCharCount){this.modeBits=modeBits,this.numBitsCharCount=numBitsCharCount}numCharCountBits(ver){return this.numBitsCharCount[Math.floor((ver+7)/17)]}};_Mode.NUMERIC=new _Mode(1,[10,12,14]),_Mode.ALPHANUMERIC=new _Mode(2,[9,11,13]),_Mode.BYTE=new _Mode(4,[8,16,16]),_Mode.KANJI=new _Mode(8,[8,10,12]),_Mode.ECI=new _Mode(7,[0,0,0]),QrSegment2.Mode=_Mode})(qrcodegen2.QrSegment||(qrcodegen2.QrSegment={}))})(qrcodegen||(qrcodegen={}));var qrcodegen_default=qrcodegen;/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */var ERROR_LEVEL_MAP={L:qrcodegen_default.QrCode.Ecc.LOW,M:qrcodegen_default.QrCode.Ecc.MEDIUM,Q:qrcodegen_default.QrCode.Ecc.QUARTILE,H:qrcodegen_default.QrCode.Ecc.HIGH},DEFAULT_SIZE=128,DEFAULT_LEVEL="L",DEFAULT_BGCOLOR="#FFFFFF",DEFAULT_FGCOLOR="#000000",DEFAULT_INCLUDEMARGIN=!1,DEFAULT_MINVERSION=1,SPEC_MARGIN_SIZE=4,DEFAULT_MARGIN_SIZE=0,DEFAULT_IMG_SCALE=.1;function generatePath(modules,margin=0){const ops=[];return modules.forEach(function(row2,y){let start=null;row2.forEach(function(cell,x){if(!cell&&start!==null){ops.push(`M${start+margin} ${y+margin}h${x-start}v1H${start+margin}z`),start=null;return}if(x===row2.length-1){if(!cell)return;start===null?ops.push(`M${x+margin},${y+margin} h1v1H${x+margin}z`):ops.push(`M${start+margin},${y+margin} h${x+1-start}v1H${start+margin}z`);return}cell&&start===null&&(start=x)})}),ops.join("")}function excavateModules(modules,excavation){return modules.slice().map((row2,y)=>y<excavation.y||y>=excavation.y+excavation.h?row2:row2.map((cell,x)=>x<excavation.x||x>=excavation.x+excavation.w?cell:!1))}function getImageSettings(cells,size,margin,imageSettings){if(imageSettings==null)return null;const numCells=cells.length+margin*2,defaultSize=Math.floor(size*DEFAULT_IMG_SCALE),scale=numCells/size,w=(imageSettings.width||defaultSize)*scale,h=(imageSettings.height||defaultSize)*scale,x=imageSettings.x==null?cells.length/2-w/2:imageSettings.x*scale,y=imageSettings.y==null?cells.length/2-h/2:imageSettings.y*scale,opacity=imageSettings.opacity==null?1:imageSettings.opacity;let excavation=null;if(imageSettings.excavate){let floorX=Math.floor(x),floorY=Math.floor(y),ceilW=Math.ceil(w+x-floorX),ceilH=Math.ceil(h+y-floorY);excavation={x:floorX,y:floorY,w:ceilW,h:ceilH}}const crossOrigin=imageSettings.crossOrigin;return{x,y,h,w,excavation,opacity,crossOrigin}}function getMarginSize(includeMargin,marginSize){return marginSize!=null?Math.max(Math.floor(marginSize),0):includeMargin?SPEC_MARGIN_SIZE:DEFAULT_MARGIN_SIZE}function useQRCode({value:value2,level,minVersion,includeMargin,marginSize,imageSettings,size,boostLevel}){let qrcode=React.useMemo(()=>{const segments=(Array.isArray(value2)?value2:[value2]).reduce((accum,v)=>(accum.push(...qrcodegen_default.QrSegment.makeSegments(v)),accum),[]);return qrcodegen_default.QrCode.encodeSegments(segments,ERROR_LEVEL_MAP[level],minVersion,void 0,void 0,boostLevel)},[value2,level,minVersion,boostLevel]);const{cells,margin,numCells,calculatedImageSettings}=React.useMemo(()=>{let cells2=qrcode.getModules();const margin2=getMarginSize(includeMargin,marginSize),numCells2=cells2.length+margin2*2,calculatedImageSettings2=getImageSettings(cells2,size,margin2,imageSettings);return{cells:cells2,margin:margin2,numCells:numCells2,calculatedImageSettings:calculatedImageSettings2}},[qrcode,size,imageSettings,includeMargin,marginSize]);return{qrcode,margin,cells,numCells,calculatedImageSettings}}var SUPPORTS_PATH2D=function(){try{new Path2D().addPath(new Path2D)}catch{return!1}return!0}(),QRCodeCanvas=React.forwardRef(function(props,forwardedRef){const _a=props,{value:value2,size=DEFAULT_SIZE,level=DEFAULT_LEVEL,bgColor=DEFAULT_BGCOLOR,fgColor=DEFAULT_FGCOLOR,includeMargin=DEFAULT_INCLUDEMARGIN,minVersion=DEFAULT_MINVERSION,boostLevel,marginSize,imageSettings}=_a,_b=__objRest(_a,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style}=_b,otherProps=__objRest(_b,["style"]),imgSrc=imageSettings?.src,_canvas=React.useRef(null),_image=React.useRef(null),setCanvasRef=React.useCallback(node=>{_canvas.current=node,typeof forwardedRef=="function"?forwardedRef(node):forwardedRef&&(forwardedRef.current=node)},[forwardedRef]),[isImgLoaded,setIsImageLoaded]=React.useState(!1),{margin,cells,numCells,calculatedImageSettings}=useQRCode({value:value2,level,minVersion,boostLevel,includeMargin,marginSize,imageSettings,size});React.useEffect(()=>{if(_canvas.current!=null){const canvas=_canvas.current,ctx=canvas.getContext("2d");if(!ctx)return;let cellsToDraw=cells;const image=_image.current,haveImageToRender=calculatedImageSettings!=null&&image!==null&&image.complete&&image.naturalHeight!==0&&image.naturalWidth!==0;haveImageToRender&&calculatedImageSettings.excavation!=null&&(cellsToDraw=excavateModules(cells,calculatedImageSettings.excavation));const pixelRatio=window.devicePixelRatio||1;canvas.height=canvas.width=size*pixelRatio;const scale=size/numCells*pixelRatio;ctx.scale(scale,scale),ctx.fillStyle=bgColor,ctx.fillRect(0,0,numCells,numCells),ctx.fillStyle=fgColor,SUPPORTS_PATH2D?ctx.fill(new Path2D(generatePath(cellsToDraw,margin))):cells.forEach(function(row2,rdx){row2.forEach(function(cell,cdx){cell&&ctx.fillRect(cdx+margin,rdx+margin,1,1)})}),calculatedImageSettings&&(ctx.globalAlpha=calculatedImageSettings.opacity),haveImageToRender&&ctx.drawImage(image,calculatedImageSettings.x+margin,calculatedImageSettings.y+margin,calculatedImageSettings.w,calculatedImageSettings.h)}}),React.useEffect(()=>{setIsImageLoaded(!1)},[imgSrc]);const canvasStyle=__spreadValues({height:size,width:size},style);let img=null;return imgSrc!=null&&(img=React.createElement("img",{src:imgSrc,key:imgSrc,style:{display:"none"},onLoad:()=>{setIsImageLoaded(!0)},ref:_image,crossOrigin:calculatedImageSettings?.crossOrigin})),React.createElement(React.Fragment,null,React.createElement("canvas",__spreadValues({style:canvasStyle,height:size,width:size,ref:setCanvasRef,role:"img"},otherProps)),img)});QRCodeCanvas.displayName="QRCodeCanvas";var QRCodeSVG=React.forwardRef(function(props,forwardedRef){const _a=props,{value:value2,size=DEFAULT_SIZE,level=DEFAULT_LEVEL,bgColor=DEFAULT_BGCOLOR,fgColor=DEFAULT_FGCOLOR,includeMargin=DEFAULT_INCLUDEMARGIN,minVersion=DEFAULT_MINVERSION,boostLevel,title,marginSize,imageSettings}=_a,otherProps=__objRest(_a,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin,cells,numCells,calculatedImageSettings}=useQRCode({value:value2,level,minVersion,boostLevel,includeMargin,marginSize,imageSettings,size});let cellsToDraw=cells,image=null;imageSettings!=null&&calculatedImageSettings!=null&&(calculatedImageSettings.excavation!=null&&(cellsToDraw=excavateModules(cells,calculatedImageSettings.excavation)),image=React.createElement("image",{href:imageSettings.src,height:calculatedImageSettings.h,width:calculatedImageSettings.w,x:calculatedImageSettings.x+margin,y:calculatedImageSettings.y+margin,preserveAspectRatio:"none",opacity:calculatedImageSettings.opacity,crossOrigin:calculatedImageSettings.crossOrigin}));const fgPath=generatePath(cellsToDraw,margin);return React.createElement("svg",__spreadValues({height:size,width:size,viewBox:`0 0 ${numCells} ${numCells}`,ref:forwardedRef,role:"img"},otherProps),!!title&&React.createElement("title",null,title),React.createElement("path",{fill:bgColor,d:`M0,0 h${numCells}v${numCells}H0z`,shapeRendering:"crispEdges"}),React.createElement("path",{fill:fgColor,d:fgPath,shapeRendering:"crispEdges"}),image)});QRCodeSVG.displayName="QRCodeSVG";const panel$1="_panel_1yx0m_3",panelTitle="_panelTitle_1yx0m_13",panelContent="_panelContent_1yx0m_26",panelQr="_panelQr_1yx0m_38",inputRow="_inputRow_1yx0m_48",qrCode="_qrCode_1yx0m_61",styles$5={panel:panel$1,panelTitle,panelContent,panelQr,inputRow,qrCode},QRCodeSizePanel=170;function createSegments(url){try{const{origin}=new URL(url),segments=[origin,url.slice(origin.length)];return segments.join("")===url?segments:[url]}catch{return[url]}}function SSICQrCode(props){const{mode,qrCodeUrl,passport,showSSIC,setShowSSIC,ssicWindowConfig,setSsicWindowConfig,controllerEnv,setControllerEnv,sideloadedControllerUrl,selectedController:_selectedController,setSelectedController:_setSelectedController,controllerOptions:_controllerOptions,testbedVersion,setTestbedVersion,onCollapse,collapseIcon:CollapseIcon=IconCollapsePanelLeft,hideToolbar=!1}=props,{controllerBeacon,controllerConnectToEditorLink,enableLoadCustomTestbedVersion}=useFeature(),{isDisconnected}=useStreamingModeInfo(mode),[redeemBeacon]=useControllerBeacon({passport:passport??""}),{trackEvent}=useFullStory(),segmentedUrl=reactExports.useMemo(()=>qrCodeUrl&&createSegments(qrCodeUrl),[qrCodeUrl]),devMode=!1;reactExports.useMemo(()=>window.location.href.includes("staging"),[]);const sessionOpen=mode===StreamingMode.OPEN,handleCopyQrCode=reactExports.useCallback(()=>{if(qrCodeUrl)try{navigator.clipboard.writeText(qrCodeUrl),createToast({title:"Link copied to clipboard",icon:IconClipboard})}catch{createWarning({title:"Link copy failed",icon:IconClipboard})}},[qrCodeUrl]),handleChangeControllerEnvironment=reactExports.useCallback((_ev,newValue)=>{setControllerEnv(newValue),trackEvent("Controller Env",{env:newValue})},[trackEvent,setControllerEnv]),tooltipProps=reactExports.useMemo(()=>sideloadedControllerUrl?{[ControllerEnvironment.TESTBED]:{tooltipDescription:"",tooltipLabel:"Controller environment not available for builds with sideloaded controller url"},[ControllerEnvironment.PROD]:{tooltipDescription:"",tooltipLabel:"Controller environment not available for builds with sideloaded controller url"}}:isDisconnected?{[ControllerEnvironment.TESTBED]:{tooltipDescription:"Includes unreleased features still in development.",tooltipLabel:"Simulate test environment"},[ControllerEnvironment.PROD]:{tooltipDescription:"Includes only fully released features.",tooltipLabel:"Simulate production environment"}}:{[ControllerEnvironment.TESTBED]:{tooltipDescription:"",tooltipLabel:"Cannot edit while the game is running"},[ControllerEnvironment.PROD]:{tooltipDescription:"",tooltipLabel:"Cannot edit while the game is running"}},[isDisconnected,sideloadedControllerUrl]),handleConnectToControllerEditor=reactExports.useCallback(async()=>{if(!qrCodeUrl||!passport)return;const beaconCode=extractBeaconCode(qrCodeUrl);if(beaconCode)try{const redeemed=(await redeemBeacon({variables:{beaconCode}})).data?.ngpRedeemBeacon;if(redeemed?.__typename==="NGPRedeemBeaconFailed"){createWarning({title:redeemed.reason||"Could not connect to Controller Editor"});return}if(!redeemed||redeemed.__typename!=="NGPRedeemBeaconSuccess")return;window.open(buildControllerUrl(redeemed).replace(/^https?:\/\//,"ngce://"))}catch{createWarning({title:"Could not connect to Controller Editor"})}},[qrCodeUrl,passport,redeemBeacon]);return jsxRuntimeExports.jsxs("div",{className:styles$5.panel,children:[!hideToolbar&&jsxRuntimeExports.jsxs("div",{className:"sr-toolbar",children:[jsxRuntimeExports.jsx(Button,{compact:!0,variant:"icon",icon:CollapseIcon,"aria-label":"Collapse panel",onClick:onCollapse}),jsxRuntimeExports.jsx("span",{className:styles$5.panelTitle,children:"NGC QR Code"}),jsxRuntimeExports.jsx(Button,{compact:!0,variant:"icon",icon:IconLinkOut,"aria-label":"Open QR code in new tab",disabled:!sessionOpen||!qrCodeUrl,onClick:()=>qrCodeUrl&&window.open(qrCodeUrl,"_blank")})]}),jsxRuntimeExports.jsxs("div",{className:styles$5.panelContent,children:[devMode,controllerBeacon&&jsxRuntimeExports.jsxs(ToggleButtonGroup,{compact:!0,disabled:!isDisconnected||!!sideloadedControllerUrl,onChange:handleChangeControllerEnvironment,defaultValue:controllerEnv,style:{width:"100%"},children:[jsxRuntimeExports.jsx(ToggleButton,{compact:!0,value:ControllerEnvironment.TESTBED,tooltipDescription:tooltipProps[ControllerEnvironment.TESTBED].tooltipDescription,tooltipLabel:tooltipProps[ControllerEnvironment.TESTBED].tooltipLabel,children:"Testbed"}),jsxRuntimeExports.jsx(ToggleButton,{compact:!0,value:ControllerEnvironment.PROD,tooltipDescription:tooltipProps[ControllerEnvironment.PROD].tooltipDescription,tooltipLabel:tooltipProps[ControllerEnvironment.PROD].tooltipLabel,children:"Prod"})]}),enableLoadCustomTestbedVersion&&controllerEnv===ControllerEnvironment.TESTBED&&!sideloadedControllerUrl&&jsxRuntimeExports.jsx(Tooltip,{placement:"top",label:"Specify a testbed version to load. Leave blank or enter 'latest' to use the most recent testbed version.",children:jsxRuntimeExports.jsx(Input,{compact:!0,label:"Testbed version",value:testbedVersion,onChange:e=>setTestbedVersion(e.target.value),disabled:!isDisconnected,inputProps:{autoComplete:"off",placeholder:"latest"},style:{width:"100%"}})}),jsxRuntimeExports.jsxs("div",{className:styles$5.inputRow,children:[jsxRuntimeExports.jsx(Input,{compact:!0,label:"Starting Players",onChange:e=>{Number.isInteger(+e.target.value)&&setSsicWindowConfig({...ssicWindowConfig,minSSIC:+e.target.value})},value:ssicWindowConfig.minSSIC,disabled:showSSIC,inputProps:{pattern:/^[0-9]+$/,autoComplete:"off"}}),jsxRuntimeExports.jsx(Input,{compact:!0,label:"Max Players",onChange:e=>{Number.isInteger(+e.target.value)&&setSsicWindowConfig({...ssicWindowConfig,maxSSIC:+e.target.value})},value:ssicWindowConfig.maxSSIC,disabled:showSSIC,inputProps:{pattern:/^[0-9]+$/,autoComplete:"off"}})]}),jsxRuntimeExports.jsx(Button,{compact:!0,variant:"secondary",style:{width:"100%"},disabled:!sessionOpen,onClick:()=>setShowSSIC(!showSSIC),children:showSSIC?"Close Virtual Controller":"Open Virtual Controller"}),controllerConnectToEditorLink&&jsxRuntimeExports.jsx(Button,{compact:!0,variant:"secondary",style:{width:"100%"},disabled:!sessionOpen||!qrCodeUrl||!passport,onClick:handleConnectToControllerEditor,children:"Connect to Controller Editor"})]}),jsxRuntimeExports.jsx("div",{className:styles$5.panelQr,children:sessionOpen?jsxRuntimeExports.jsx(HawkinsProvider,{theme:"dark",children:controllerBeacon?jsxRuntimeExports.jsx("div",{className:styles$5.qrCode,children:segmentedUrl?jsxRuntimeExports.jsx(QRCodeSVG,{level:"L",size:QRCodeSizePanel,value:segmentedUrl,bgColor:"transparent",fgColor:Colors.Black,boostLevel:!1,"data-url":qrCodeUrl}):jsxRuntimeExports.jsx(MockQrPlaceholder,{})}):jsxRuntimeExports.jsxs(Stack,{gap:Dimensions.Space8,layout:{alignItems:"center"},children:[jsxRuntimeExports.jsx("div",{className:styles$5.qrCode,children:qrCodeUrl?jsxRuntimeExports.jsx(QRCodeSVG,{level:"L",size:QRCodeSizePanel,value:qrCodeUrl,bgColor:"transparent",fgColor:Colors.Black,boostLevel:!1,"data-url":qrCodeUrl}):jsxRuntimeExports.jsx(MockQrPlaceholder,{})}),qrCodeUrl&&jsxRuntimeExports.jsx(Button,{compact:!0,icon:IconClipboard,variant:"tertiary",onClick:handleCopyQrCode,children:"Copy Link"})]})}):jsxRuntimeExports.jsx(ContextualBanner,{compact:!0,text:"Start a session to get a Controller QR code"})})]})}function MockQrPlaceholder(){const[ready,setReady]=reactExports.useState(!1);return reactExports.useEffect(()=>{const t=setTimeout(()=>setReady(!0),2500);return()=>clearTimeout(t)},[]),ready?jsxRuntimeExports.jsx("img",{src:((window.__BASE_PATH__||"")+"/assets/qr-placeholder.png"),alt:"Controller QR code (placeholder)",width:QRCodeSizePanel,height:QRCodeSizePanel,style:{display:"block",width:QRCodeSizePanel,height:QRCodeSizePanel,objectFit:"contain"}}):jsxRuntimeExports.jsx(SkeletonLoader,{variant:"square",width:QRCodeSizePanel,height:QRCodeSizePanel})}
const PlayPageContext=reactExports.createContext(null),PlayPageProvider=PlayPageContext.Provider;function usePlayPage(){const ctx=reactExports.useContext(PlayPageContext);if(!ctx)throw new Error("usePlayPage must be used within PlayPageProvider");return ctx}const Background=()=>jsxRuntimeExports.jsx("div",{style:{position:"absolute",left:0,right:0,height:"100%",backgroundColor:"var(--hawkins-theme-surface-flat)"}}),PageContent=props=>{const{sessionId}=props,{gameLogs,controllerLogs,playhead,onLogPlayhead,sessionStartMs}=usePlayPage();return jsxRuntimeExports.jsx(MultiSourceLogPanel,{sessionId,namePrefix:"browser",gameLogs,controllerLogs,idleMessage:"No log loaded. Press Play to start a session",showControllerStatusBar:!0,defaultLayoutMode:"split",currentTime:playhead?.time??null,sessionStartMs,playheadSource:playhead?.source??null,onSelectLog:onLogPlayhead})},MockGameplayPlaceholder=()=>{const videoRef=reactExports.useRef(null),[delayDone,setDelayDone]=reactExports.useState(!1),[canPlay,setCanPlay]=reactExports.useState(!1),ready=delayDone&&canPlay;reactExports.useEffect(()=>{const t=setTimeout(()=>setDelayDone(!0),2500);return()=>clearTimeout(t)},[]);reactExports.useEffect(()=>{const v=videoRef.current;ready&&v&&v.play().catch(()=>{})},[ready]);return jsxRuntimeExports.jsxs("div",{style:{position:"absolute",inset:0,overflow:"hidden",backgroundColor:"#000"},children:[jsxRuntimeExports.jsx("video",{ref:videoRef,src:((window.__BASE_PATH__||"")+"/assets/game-capture.mp4"),preload:"auto",loop:!0,muted:!0,playsInline:!0,onCanPlay:()=>setCanPlay(!0),style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"contain",opacity:ready?1:0,transition:"opacity 400ms ease"}}),!ready&&jsxRuntimeExports.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,color:"#fff",fontFamily:"inherit"},children:[jsxRuntimeExports.jsx("style",{children:"@keyframes mockSpin{to{transform:rotate(360deg)}}"}),jsxRuntimeExports.jsx("div",{style:{width:48,height:48,borderRadius:"50%",border:"4px solid rgba(255,255,255,0.25)",borderTopColor:"#fff",animation:"mockSpin 0.9s linear infinite"}}),jsxRuntimeExports.jsx("div",{style:{fontSize:14,opacity:0.85},children:"Buffering stream…"})]})]})},isKeyboardSupported=nav=>nav.keyboard?.lock!==void 0,useFullScreen=element=>{const[ref,setRef]=reactExports.useState(null),[fullscreen2,setFullscreen]=reactExports.useState(!!document.fullscreenElement),{headless}=useFeature(),requestFullscreen=reactExports.useCallback(()=>{if(!fullscreen2)if(headless)try{globalThis.window.AppAPI.send("request-fullscreen"),setFullscreen(!0)}catch(error){console.log("Error sending request-fullscreen:",error)}else ref?.requestFullscreen?.()},[fullscreen2,ref,headless]),exitFullscreen=reactExports.useCallback(()=>{if(fullscreen2)if(headless)try{globalThis.window.AppAPI.send("exit-fullscreen"),setFullscreen(!1)}catch(error){console.log("Error sending exit-fullscreen:",error)}else document.exitFullscreen?.()},[fullscreen2,headless]),toggleFullscreen=reactExports.useCallback(()=>{fullscreen2?exitFullscreen():requestFullscreen()},[fullscreen2,requestFullscreen,exitFullscreen]);return reactExports.useEffect(()=>{const handleKeyDown=e=>{e.code==="Tab"&&(e.shiftKey&&exitFullscreen(),e.preventDefault())};return fullscreen2&&document.addEventListener("keydown",handleKeyDown),()=>{document.removeEventListener("keydown",handleKeyDown)}},[fullscreen2]),reactExports.useEffect(()=>{const handleFullscreenChange=async e=>{const isFullScreen=!!document.fullscreenElement;isKeyboardSupported(navigator)&&(isFullScreen?await navigator.keyboard.lock(["Escape"]):navigator.keyboard.unlock()),setFullscreen(()=>isFullScreen)};return document.addEventListener("fullscreenchange",handleFullscreenChange),()=>{document.removeEventListener("fullscreenchange",handleFullscreenChange)}},[]),{ref,setRef,fullscreen:fullscreen2,requestFullscreen,exitFullscreen,toggleFullscreen}},isHTMLVideoElement=obj=>obj&&typeof obj.videoWidth=="number",imageBlob=source=>new Promise((resolve,reject)=>{const canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");ctx&&(isHTMLVideoElement(source)?(canvas.width=source.videoWidth,canvas.height=source.videoHeight):(canvas.width=source.width,canvas.height=source.height),ctx.drawImage(source,0,0,canvas.width,canvas.height)),canvas.toBlob(blob=>blob?resolve(blob):reject())}),copyToClipboard=blob=>new Promise(async(resolve,reject)=>{if(!blob)return reject();try{const item=new ClipboardItem({"image/png":blob});return resolve(await navigator.clipboard.write([item]))}catch(e){return reject(e)}}),mediaStreamBlob=async stream=>{const videoTrack=stream.getVideoTracks()[0];if(!videoTrack)return Promise.reject();if("ImageCapture"in window){const image=await new ImageCapture(videoTrack).grabFrame();return imageBlob(image)}return new Promise((resolve,reject)=>{const video=document.createElement("video");video.srcObject=stream,video.muted=!0,video.play().then(()=>{resolve(imageBlob(video))}).catch(reject)})},useScreenshot=ref=>{const[{gameId,channelName}]=useSearchParams(),{trackEvent}=useFullStory();return{capture:reactExports.useCallback(()=>{const video=ref?.getElementsByTagName("video")[0];if(!video)return;trackEvent("Screenshot Game",{game:gameId,channel:channelName});const videoStream=video.srcObject;createProgress(mediaStreamBlob(videoStream).then(copyToClipboard),{title:{loading:jsxRuntimeExports.jsx("b",{children:"Creating Screenshot..."}),success:jsxRuntimeExports.jsx("b",{children:"Screenshot copied to clipboard"}),error:jsxRuntimeExports.jsx("b",{children:"Failed to copy screenshot!"})},options:{id:"screenshot",position:"top-center"}})},[ref,gameId,channelName])}},createVideoRecorder=(audio,video,options)=>{const videoStream=video.srcObject,audioStream=audio.srcObject,combinedStream=new MediaStream([...videoStream.getVideoTracks(),...audioStream.getAudioTracks()]);return new MediaRecorder(combinedStream,options)},TimeStamp=()=>{const[time,setTime]=reactExports.useState(0);return reactExports.useEffect(()=>{const interval=setInterval(()=>setTime(prev=>prev+1e3),1e3);return()=>{clearInterval(interval)}},[]),jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:["(",hooks.utc(time).format("HH:mm:ss"),")"]})},useVideoCapture=ref=>{const recorderRef=reactExports.useRef(),[state,setState]=reactExports.useState("inactive"),{trackEvent}=useFullStory(),[{gameId,channelName}]=useSearchParams(),handleStop=reactExports.useCallback(()=>{const r=recorderRef.current;r&&r.state==="recording"&&(setState(()=>r.state),r.stop())},[recorderRef]),handleCapture=reactExports.useCallback((maxVideoLengthMs=3e5)=>{const audio=ref?.getElementsByTagName("audio")[0],video=ref?.getElementsByTagName("video")[0];if(!audio||!video)return;trackEvent("Record Game",{game:gameId,channel:channelName});const chunks=[],mimeType="video/webm;",r=createVideoRecorder(audio,video,{mimeType});recorderRef.current=r,r.ondataavailable=e=>chunks.push(e.data),r.start(),setState(()=>"recording");const lengthTimeout=setTimeout(handleStop,maxVideoLengthMs),stopped=new Promise((resolve,reject)=>{r.onstop=()=>{clearTimeout(lengthTimeout),setState(()=>r.state),resolve(r.state)},r.onerror=event=>{clearTimeout(lengthTimeout),setState(()=>r.state),reject(event)}});createProgress(stopped.then(()=>{const blob=new Blob(chunks,{type:mimeType});download("video",blob,"webm")}),{title:{loading:jsxRuntimeExports.jsxs("div",{children:[jsxRuntimeExports.jsx("b",{children:"Video Recording"}),jsxRuntimeExports.jsx(TimeStamp,{})]}),success:"Video Record Complete",error:"Video Record Error"},options:{id:"video-capture",position:"top-center"}})},[recorderRef,ref,trackEvent,handleStop,gameId,channelName]),handleToggle=reactExports.useCallback(()=>state==="inactive"?handleCapture():handleStop(),[state,handleCapture,handleStop]);return{state,stop:handleStop,capture:handleCapture,toggle:handleToggle}},playerGroup="_playerGroup_dabhc_1",videoCanvas="_videoCanvas_dabhc_12",fullWindow="_fullWindow_dabhc_35",fullscreen="_fullscreen_dabhc_48",playerContainer="_playerContainer_dabhc_65",bannerContainer="_bannerContainer_dabhc_76",styles$4={playerGroup,videoCanvas,fullWindow,fullscreen,playerContainer,bannerContainer},useAudioVolume=isPlaying=>{const audioRef=reactExports.useRef(null),[volume,setVolume]=reactExports.useState(1);reactExports.useEffect(()=>{if(isPlaying&&!audioRef.current){const audioElement=document.getElementsByTagName("audio")[0]||null;audioRef.current=audioElement,audioElement&&(audioElement.volume=volume)}else isPlaying||(audioRef.current=null)},[isPlaying,volume]);const handleVolumeChange=reactExports.useCallback(newVolume=>{setVolume(newVolume),audioRef.current&&(audioRef.current.volume=newVolume)},[]);return{volume,handleVolumeChange}},TOOLTIP_DELAY=500,PlayerToolbar=({mode,fullscreen:fullscreen2,fullWindow:fullWindow2=!1,onScreenshot,onToggleFullscreen,onToggleVideoCapture,videoCaptureState})=>{const{isPlaying}=useStreamingModeInfo(mode),{headless}=useFeature(),videoRef=reactExports.useRef(null),[isPiP,setIsPiP]=reactExports.useState(!1),[volumeSliderOpen,setVolumeSliderOpen]=reactExports.useState(!1),{volume,handleVolumeChange}=useAudioVolume(isPlaying),preMuteVolumeRef=reactExports.useRef(1),onToggleMute=reactExports.useCallback(()=>{volume>0?(preMuteVolumeRef.current=volume,handleVolumeChange(0)):handleVolumeChange(preMuteVolumeRef.current||1)},[volume,handleVolumeChange]),volumeIcon=reactExports.useMemo(()=>volume===0?IconVolumeOff:volume>0&&volume<=.33?IconVolumeLow:volume>.33&&volume<=.66?IconVolumeMedium:IconVolumeHigh,[volume]),onToggle=({open,reason})=>{reason!=="outside-press"&&setVolumeSliderOpen(open)},onTogglePictureInPicture=reactExports.useCallback(async()=>{if(videoRef.current=document.querySelector("#video_canvas > video"),!(!videoRef.current||!isPlaying))try{document.pictureInPictureElement?(await document.exitPictureInPicture(),setIsPiP(!1)):(await videoRef.current.requestPictureInPicture(),setIsPiP(!0))}catch(err){console.error("PiP error:",err)}},[isPlaying]);return headless&&fullscreen2?null:jsxRuntimeExports.jsxs("div",{className:clsx("sr-player-toolbar",{"sr-player-toolbar--full-window":fullWindow2}),children:[jsxRuntimeExports.jsx(ButtonGroup,{justifyContent:"flex-start",gap:Dimensions.Space8,children:jsxRuntimeExports.jsxs(HoverCard,{interactive:!0,placement:"top-start",open:volumeSliderOpen,onToggle,children:[jsxRuntimeExports.jsx(HoverCard.Trigger,{children:jsxRuntimeExports.jsx(Button,{icon:volumeIcon,variant:"tertiary","aria-label":"volume",onClick:onToggleMute,tooltipLabel:volume===0?"Unmute":"Mute",tooltipProps:{enterDelay:TOOLTIP_DELAY}})}),jsxRuntimeExports.jsx(HoverCard.Content,{children:jsxRuntimeExports.jsx(Paper,{elevation:2,children:jsxRuntimeExports.jsx(Slider,{value:Math.round(volume*100),defaultValue:100,max:100,min:0,maxIcon:IconVolumeHigh,maxIconProps:{"aria-hidden":!0},minIcon:IconVolumeOff,minIconProps:{"aria-hidden":!0},onChange:(_ev,newValue)=>{handleVolumeChange(newValue/100)},style:{width:Dimensions.RawSize224}})})})]})}),jsxRuntimeExports.jsxs(ButtonGroup,{justifyContent:"flex-end",gap:Dimensions.Space8,children:[!headless&&jsxRuntimeExports.jsx(NotificationBadge,{invisible:!isPiP,children:jsxRuntimeExports.jsx(Button,{icon:IconPictureInPicture,variant:"tertiary","aria-label":"picture-in-picture",onClick:onTogglePictureInPicture,tooltipLabel:"Toggle Picture in Picture mode",tooltipProps:{enterDelay:TOOLTIP_DELAY},disabled:!isPlaying})}),jsxRuntimeExports.jsx(NotificationBadge,{invisible:videoCaptureState!=="recording",children:jsxRuntimeExports.jsx(Button,{icon:IconVideoCamera,variant:"tertiary","aria-label":"video capture",onClick:onToggleVideoCapture,tooltipLabel:`${isPlaying?videoCaptureState==="recording"?"Recording Video":"Record Video":"Record Disabled"}`,tooltipProps:{enterDelay:TOOLTIP_DELAY},disabled:!isPlaying})}),jsxRuntimeExports.jsx(Button,{icon:IconCamera,variant:"tertiary","aria-label":"screenshot",onClick:onScreenshot,tooltipLabel:`${isPlaying?"Capture Screenshot":"Capture Disabled"}`,tooltipProps:{enterDelay:TOOLTIP_DELAY},disabled:!isPlaying}),jsxRuntimeExports.jsx(Button,{icon:fullscreen2?IconFullscreenExit:IconFullscreenEnter,variant:"tertiary","aria-label":"toggle fullscreen",onClick:onToggleFullscreen,tooltipLabel:`${fullscreen2?"Exit":"Enter"} Fullscreen`,tooltipProps:{enterDelay:TOOLTIP_DELAY}})]})]})},getLoadingMessage=loadingProgress=>{if(!loadingProgress)return"Connecting...";const{step,stepLabel,gameLoadPercent}=loadingProgress,label2=stepLabel||LoadingStepLabels[step]||"Loading";return step==="loading_game"&&gameLoadPercent>0?`${label2}... ${gameLoadPercent}%`:step==="ready"?"Starting stream...":`${label2}...`},VideoLoader=({loading,mode,loadingProgress})=>loading?mode===StreamingMode.AUTOPLAY_BLOCKED?jsxRuntimeExports.jsx(Centered,{style:{position:"absolute",top:0,left:0,right:0,bottom:0},children:jsxRuntimeExports.jsx(Button,{onClick:()=>{document.querySelector("#video_canvas > video")?.play()},children:"Play"})}):mode===StreamingMode.WAITING_FOR_VOCGA?jsxRuntimeExports.jsx(Centered,{style:{position:"absolute",top:0,left:0,right:0,bottom:0},children:jsxRuntimeExports.jsxs(Stack,{style:{alignItems:"center",display:"flex",flexDirection:"column"},gap:10,children:[jsxRuntimeExports.jsx(Loader,{style:{color:"white"}}),jsxRuntimeExports.jsx(Text,{color:"white",children:"Starting VOCGA..."})]})}):jsxRuntimeExports.jsx(Centered,{style:{position:"absolute",top:0,left:0,right:0,bottom:0},children:jsxRuntimeExports.jsxs(Stack,{style:{alignItems:"center",display:"flex",flexDirection:"column"},gap:10,children:[jsxRuntimeExports.jsx(Loader,{style:{color:"white"}}),jsxRuntimeExports.jsx(Text,{color:"white",children:getLoadingMessage(loadingProgress)})]})}):null,PagePlayer=({disabled,loading,mode,failedMessage,fullWindow:fullWindow2=!1,onToggleConnection,loadingProgress})=>{const{showModal}=useModal(),{setRef:setPlayerRef,ref:playerRef,fullscreen:fullscreen2,toggleFullscreen}=useFullScreen(),{capture:captureImage}=useScreenshot(playerRef),{stop:stopVideoCapture,state:videoState,toggle:toggleVideoCapture}=useVideoCapture(playerRef);return mode===StreamingMode.CLOSED&&videoState==="recording"&&stopVideoCapture(),reactExports.useLayoutEffect(()=>stopVideoCapture,[stopVideoCapture]),jsxRuntimeExports.jsx(Centered,{style:{flexDirection:"column",height:"100%"},children:jsxRuntimeExports.jsxs("div",{className:styles$4.playerGroup,children:[jsxRuntimeExports.jsxs("div",{className:styles$4.playerContainer,ref:setPlayerRef,children:[jsxRuntimeExports.jsx("div",{className:clsx(styles$4.videoCanvas,{[styles$4.fullscreen]:fullscreen2,[styles$4.fullWindow]:fullWindow2}),id:"video_canvas",children:mode===StreamingMode.OPEN&&jsxRuntimeExports.jsx(MockGameplayPlaceholder,{})}),jsxRuntimeExports.jsx(VideoLoader,{loading,mode,loadingProgress}),failedMessage&&jsxRuntimeExports.jsx("div",{className:styles$4.bannerContainer,children:jsxRuntimeExports.jsx(ContextualBanner,{text:failedMessage,title:"Error",variant:"error",fullWidth:!0,customActionPlacement:"right",customActions:[jsxRuntimeExports.jsx(Button,{icon:IconUpload,variant:"tertiary",onClick:()=>showModal("uploadBuild"),children:"Upload Build"},"upload")]})})]}),jsxRuntimeExports.jsx(PlayerToolbar,{disabled,mode,fullscreen:fullscreen2,fullWindow:fullWindow2,onScreenshot:captureImage,onToggleFullscreen:toggleFullscreen,onToggleConnection,onToggleVideoCapture:toggleVideoCapture,videoCaptureState:videoState})]})})},container="_container_1i96a_1",section$1="_section_1i96a_10",divider$1="_divider_1i96a_17",row="_row_1i96a_23",label="_label_1i96a_27",value="_value_1i96a_36",valueText="_valueText_1i96a_43",styles$3={container,section:section$1,divider:divider$1,row,label,value,valueText};function formatVideoQuality(videoHeight,frameRate){if(!videoHeight&&!frameRate)return;const res=videoHeight?`${videoHeight}p`:"",fps=frameRate?`${frameRate}fps`:"";return`${res}${fps}`||void 0}function CopyButton({value:value2}){const[copied,setCopied]=reactExports.useState(!1),handleCopy=()=>{navigator.clipboard.writeText(value2).then(()=>{setCopied(!0),setTimeout(()=>setCopied(!1),1500)})};return jsxRuntimeExports.jsx(Tooltip,{label:copied?"Copied!":"Copy to clipboard",children:jsxRuntimeExports.jsx(Button,{variant:"icon",compact:!0,icon:IconClipboard,"aria-label":"Copy to clipboard",onClick:handleCopy,style:{width:20,height:20,flexShrink:0}})})}function Row({label:label2,value:value2,loading,copyable,chips,placeholder="—"}){const displayValue=chips&&chips.length>0?chips.join(", "):value2,displayCopyable=copyable||chips&&chips.length>0;return jsxRuntimeExports.jsxs("div",{className:styles$3.row,children:[jsxRuntimeExports.jsx(Text,{variant:"label",colorVariant:"faded",className:styles$3.label,component:"div",children:label2}),jsxRuntimeExports.jsx("div",{className:styles$3.value,children:loading?jsxRuntimeExports.jsx(Text,{variant:"body",loading:!0,loaderProps:{width:120},children:" "}):jsxRuntimeExports.jsxs("div",{style:{display:"flex",alignItems:"center",gap:Dimensions.Space4,minWidth:0},children:[jsxRuntimeExports.jsx(Text,{variant:"body",colorVariant:displayValue?"default":"faded",noWrap:!0,className:styles$3.valueText,component:"div",children:displayValue??placeholder}),displayCopyable&&displayValue&&jsxRuntimeExports.jsx(CopyButton,{value:displayValue})]})})]})}const SessionOverviewPanel=()=>{const{sessionId,mode,activeBuild}=usePlayPage(),[sessionData,setSessionData]=reactExports.useState(),[loading,setLoading]=reactExports.useState(!1);reactExports.useEffect(()=>{setSessionData(void 0)},[sessionId]),reactExports.useEffect(()=>{if(!sessionId||mode!==StreamingMode.OPEN)return;const controller=new AbortController;return setLoading(!0),fetch$1(`/api/sessions/${sessionId}/info`,{signal:controller.signal}).then(res=>res.ok?res.json():null).then(data=>{data&&setSessionData(data)}).catch(()=>{}).finally(()=>setLoading(!1)),()=>controller.abort()},[sessionId,mode]);const isSessionOpen=mode===StreamingMode.OPEN,hostnames=sessionData?.sessions?.map(s=>s.machineHostname).filter(Boolean)??[],stackVersions=sessionData?.sessions?.map(s=>s.stackVersionBranch).filter(Boolean)??[],videoQuality=formatVideoQuality(sessionData?.videoHeight,sessionData?.frameRate);return jsxRuntimeExports.jsxs("div",{className:styles$3.container,children:[jsxRuntimeExports.jsxs("div",{className:styles$3.section,children:[jsxRuntimeExports.jsx(Row,{label:"Build ID",value:activeBuild?.id,placeholder:"No build selected",copyable:!0}),jsxRuntimeExports.jsx(Row,{label:"Build Label",value:activeBuild?.label,placeholder:"No build selected",copyable:!0}),jsxRuntimeExports.jsx(Row,{label:"Session ID",value:sessionId,placeholder:"Press Play to start",copyable:!0})]}),jsxRuntimeExports.jsx("div",{className:styles$3.divider}),jsxRuntimeExports.jsxs("div",{className:styles$3.section,children:[jsxRuntimeExports.jsx(Row,{label:"OCGA Environment",value:sessionData?.ocgaEnv,loading:isSessionOpen&&loading,placeholder:"Available after session starts"}),jsxRuntimeExports.jsx(Row,{label:"Client ESN",value:sessionData?.esn,loading:isSessionOpen&&loading,placeholder:"Available after session starts",copyable:!0}),jsxRuntimeExports.jsx(Row,{label:"Client Version",value:sessionData?.version,loading:isSessionOpen&&loading,placeholder:"Available after session starts",copyable:!0}),jsxRuntimeExports.jsx(Row,{label:"Device",value:sessionData?.deviceName,loading:isSessionOpen&&loading,placeholder:"Available after session starts"}),jsxRuntimeExports.jsx(Row,{label:"Video Quality",value:videoQuality,loading:isSessionOpen&&loading,placeholder:"Available after session starts"}),jsxRuntimeExports.jsx(Row,{label:"OCGA Versions",chips:stackVersions,loading:isSessionOpen&&loading&&stackVersions.length===0,placeholder:"Available after session starts"}),jsxRuntimeExports.jsx(Row,{label:"OCGA Hostnames",chips:hostnames,loading:isSessionOpen&&loading&&hostnames.length===0,placeholder:"Available after session starts"})]})]})},isStartupRaceError=error=>error?.includes("No session or missing StartTime")??!1,SessionPerfPanel=({sessionId,mode,screenshots=[],enforceEnvelope=!0,onEnforceEnvelopeChange,gameLogsData,controllerLogsData,currentTime,sessionStartMs,playheadSource,onGraphPlayhead})=>{const errorWarningEvents=useLogErrorWarningEvents(gameLogsData,controllerLogsData),{isDisconnected,isLoading}=useStreamingModeInfo(mode),{gameId}=useAppQueryParams(),{resourceEnvelope}=useFeature(gameId),{setPerformanceSummary}=usePlayPage(),[ocgaHardwareRevision,setOcgaHardwareRevision]=reactExports.useState(),[machineHostname,setMachineHostname]=reactExports.useState(),[hwRevisionLoaded,setHwRevisionLoaded]=reactExports.useState(!1);reactExports.useEffect(()=>{setOcgaHardwareRevision(void 0),setMachineHostname(void 0),setHwRevisionLoaded(!1)},[sessionId]),reactExports.useEffect(()=>{if(!sessionId||mode!==StreamingMode.OPEN)return;const controller=new AbortController;return fetch$1(`/api/sessions/${sessionId}/info`,{signal:controller.signal}).then(res=>res.ok?res.json():null).then(data=>{setOcgaHardwareRevision(data?.sessions?.[0]?.ocgaHardwareRevision),setMachineHostname(data?.sessions?.[0]?.machineHostname),setHwRevisionLoaded(!0)}).catch(()=>{}),()=>{controller.abort()}},[sessionId,mode]);const isOcga2026=isOcga2026Session(ocgaHardwareRevision),activeEnvelope=isOcga2026?resourceEnvelope:null,awaitingHwRevision=resourceEnvelope!=null&&!hwRevisionLoaded&&mode===StreamingMode.OPEN,hidePerfGraphs=resourceEnvelope!=null&&hwRevisionLoaded&&!isOcga2026,{datasets,targetInstanceCount,error}=useSessionTimelineMetrics({gameId,sessionId,live:!0,disabled:!sessionId||mode!==StreamingMode.OPEN,resourceEnvelope:activeEnvelope}),prevModeRef=reactExports.useRef(mode);if(reactExports.useEffect(()=>{const wasOpen=prevModeRef.current===StreamingMode.OPEN,isClosed=mode===StreamingMode.CLOSED;if(prevModeRef.current=mode,wasOpen&&isClosed&&enforceEnvelope){const statsPoints=datasets?.[ChartType.STATS]??[];if(statsPoints.length>0){const summary=generatePerformanceSummary(statsPoints);setPerformanceSummary(summary)}}},[mode,enforceEnvelope,datasets,setPerformanceSummary]),hidePerfGraphs)return jsxRuntimeExports.jsx(ContextualBanner,{text:"Performance graphs are only available for sessions on OCGA 2026 hardware",variant:"warning"});const showWaitingOverlay=!sessionId||awaitingHwRevision||isStartupRaceError(error);return jsxRuntimeExports.jsx(SessionTimelineDataProvider,{data:{...datasets,screenshots},error:isStartupRaceError(error)?null:error,isDisconnected,isLoading,targetInstanceCount,children:jsxRuntimeExports.jsx(ChartProvider,{children:showWaitingOverlay?jsxRuntimeExports.jsx(SessionTimelineChart,{sessionId:void 0,mode:StreamingMode.INITIAL,hideInstanceCount:activeEnvelope!=null,isVirtualHardware:!1,enforceEnvelope,waitingMessage:sessionId?"Waiting for session to start…":"Press Play to start a session",showWaitingLoader:!!sessionId}):jsxRuntimeExports.jsx(SessionTimelineChart,{sessionId,mode,hideInstanceCount:activeEnvelope!=null,isVirtualHardware:isVirtualOcgaSession(machineHostname),enforceEnvelope,errorWarningEvents,currentTime,sessionStartMs,playheadSource,onGraphPlayhead})})})},schema=create$3({vars:create$2(create$3({key:create$6().required("Invalid Key"),value:create$6().required("Invalid Value"),enabled:create$7().optional()})).required()}),createEmptyEnvVar=()=>({key:"",value:"",enabled:!0}),normalizeEnabled=vars=>vars.map(v=>({key:v.key,value:v.value,enabled:v.enabled!==!1})),VariableForm=reactExports.forwardRef(({disabled,options,onChangeOptions,gameId,description},ref)=>{const{setEnvVariables}=useEnvVariables(),methods=useForm({mode:"onChange",reValidateMode:"onChange",resolver:o(schema),defaultValues:{vars:options.length>0?normalizeEnabled(options):[createEmptyEnvVar()]}}),{fields,append,remove:remove2,update}=useFieldArray({control:methods.control,name:"vars"}),handleSubmit=reactExports.useCallback(({vars})=>{const outgoing=normalizeEnabled(vars);onChangeOptions(outgoing),gameId&&setEnvVariables(gameId,outgoing)},[onChangeOptions,setEnvVariables,gameId]),formRef=reactExports.useRef(null);return reactExports.useImperativeHandle(ref,()=>({onSave(){formRef.current?.dispatchEvent(new Event("submit",{cancelable:!0,bubbles:!0}))},getVars(){return normalizeEnabled(methods.getValues("vars"))},replaceVars(newVars){const next=newVars.length>0?normalizeEnabled(newVars):[createEmptyEnvVar()];methods.reset({vars:next},{keepDefaultValues:!0})}}),[methods]),jsxRuntimeExports.jsx(FormProvider,{...methods,children:jsxRuntimeExports.jsx("form",{ref:formRef,id:"variable-form",autoComplete:"off",onSubmit:methods.handleSubmit(handleSubmit),children:jsxRuntimeExports.jsx(EnvVarTable,{fields,description,disabled,onAdd:()=>append(createEmptyEnvVar()),onRemove:index=>remove2(index),onToggleEnabled:(index,isEnabled)=>{const current=methods.getValues(`vars.${index}`);update(index,{...current,enabled:!isEnabled})}})})})}),panel="_panel_81be9_1",tabContent="_tabContent_81be9_15",section="_section_81be9_21",sectionTitle="_sectionTitle_81be9_27",footer="_footer_81be9_36",styles$2={panel,tabContent,section,sectionTitle,footer},SettingsPanel=({playing,gameId,selectedEnvOptions,onSaveSettings,onSaveEnvVars,onClose})=>{const{selectedAccount,isLoading}=useSopAccounts(),{gameId:queryGameId}=useAppQueryParams(),ngpConfig=useNgpConfig(gameId),varFormRef=reactExports.useRef(null),sessionSettingsRef=reactExports.useRef(null),[activeTab,setActiveTab]=reactExports.useState("settings"),{enforceEnvelope,onEnforceEnvelopeChange,enableScreenshots,onEnableScreenshotsChange}=usePlayPage(),[draftEnvelope,setDraftEnvelope]=reactExports.useState(enforceEnvelope),[draftScreenshots,setDraftScreenshots]=reactExports.useState(enableScreenshots);reactExports.useEffect(()=>{setDraftEnvelope(enforceEnvelope)},[enforceEnvelope]),reactExports.useEffect(()=>{setDraftScreenshots(enableScreenshots)},[enableScreenshots]);const handleSave=()=>{sessionSettingsRef.current?.save(),draftEnvelope!==enforceEnvelope&&onEnforceEnvelopeChange(draftEnvelope),draftScreenshots!==enableScreenshots&&onEnableScreenshotsChange(draftScreenshots),onClose?.()},handleCancel=()=>{setDraftEnvelope(enforceEnvelope),setDraftScreenshots(enableScreenshots),onClose?.()};return jsxRuntimeExports.jsxs("div",{className:styles$2.panel,children:[jsxRuntimeExports.jsx("div",{className:"sr-toolbar",children:jsxRuntimeExports.jsx("div",{className:"sr-toggle-flat",children:jsxRuntimeExports.jsxs(ToggleButtonGroup,{compact:!0,exclusive:!0,value:activeTab,onChange:(_ev,value2)=>{value2&&setActiveTab(value2)},children:[jsxRuntimeExports.jsx(ToggleButton,{value:"settings",children:"Settings"}),jsxRuntimeExports.jsx(ToggleButton,{value:"blobs",children:"Player Blobs"}),jsxRuntimeExports.jsx(ToggleButton,{value:"envvars",children:"Env Variables"})]})})}),activeTab==="settings"&&jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsxs("div",{className:styles$2.tabContent,children:[jsxRuntimeExports.jsxs("section",{className:styles$2.section,children:[jsxRuntimeExports.jsx(Heading,{level:2,className:styles$2.sectionTitle,children:"OCG Settings"}),jsxRuntimeExports.jsx(SessionSettingsContent,{ref:sessionSettingsRef,isActive:!0,playing,gameId,ngpConfig:ngpConfig.data,onSave:onSaveSettings,showFooter:!1})]}),jsxRuntimeExports.jsx(Divider,{style:{margin:`${Dimensions.Space12} 0`}}),jsxRuntimeExports.jsxs("section",{className:styles$2.section,children:[jsxRuntimeExports.jsx(Heading,{level:2,className:styles$2.sectionTitle,children:"Performance Graph Settings"}),jsxRuntimeExports.jsxs(Stack,{gap:Dimensions.Space12,orientation:"vertical",children:[jsxRuntimeExports.jsx(Tooltip,{label:"Show resource usage bands and alert when metrics exceed limits. Can only be changed when no session is active.",children:jsxRuntimeExports.jsx(Toggle,{checked:draftEnvelope,label:"Enforce Resource Envelope",name:"settings-panel-enforce-envelope",disabled:playing,onChange:(_e,checked)=>setDraftEnvelope(checked)})}),jsxRuntimeExports.jsx(Tooltip,{label:"Automatically capture screenshots from the game stream at regular intervals. Can only be changed when no session is active.",children:jsxRuntimeExports.jsx(Toggle,{checked:draftScreenshots,label:"Enable Screenshots",name:"settings-panel-enable-screenshots",disabled:playing,onChange:(_e,checked)=>setDraftScreenshots(checked)})}),playing&&jsxRuntimeExports.jsx(Text,{colorVariant:"faded",style:{fontSize:"12px"},children:"Cannot change during an active session."})]})]})]}),jsxRuntimeExports.jsx("div",{className:styles$2.footer,children:jsxRuntimeExports.jsxs(ButtonGroup,{justifyContent:"flex-end",children:[jsxRuntimeExports.jsx(Button,{variant:"secondary",onClick:handleCancel,disabled:playing,children:"Cancel"}),jsxRuntimeExports.jsx(Button,{variant:"primary",onClick:handleSave,disabled:playing,children:"Save"})]})})]}),activeTab==="blobs"&&jsxRuntimeExports.jsxs("div",{className:styles$2.tabContent,children:[jsxRuntimeExports.jsx(Text,{colorVariant:"faded",level:0,variant:"label",children:"Test Account"}),jsxRuntimeExports.jsx(Text,{style:{marginBottom:Dimensions.Space10},children:selectedAccount?.value??"—"}),jsxRuntimeExports.jsx(PlayerBlobContent,{gameId:queryGameId,email:selectedAccount?.value,loadingSopAccount:isLoading})]}),activeTab==="envvars"&&jsxRuntimeExports.jsx("div",{className:styles$2.tabContent,children:jsxRuntimeExports.jsxs("section",{className:styles$2.section,children:[jsxRuntimeExports.jsx(Heading,{level:2,className:styles$2.sectionTitle,children:"Environment Variables"}),jsxRuntimeExports.jsx(Text,{variant:"body",colorVariant:"faded",style:{marginBottom:Dimensions.Space8},children:playing?"Environment variables cannot be modified during play":"Environment variables are sent at the start of a game"}),jsxRuntimeExports.jsx(VariableForm,{ref:varFormRef,disabled:playing,options:selectedEnvOptions??[],onChangeOptions:onSaveEnvVars,gameId})]})})]})},PerfPanelView=_=>{const{sessionId,mode,screenshots,enforceEnvelope,onEnforceEnvelopeChange,gameLogs,controllerLogs,playhead,onGraphPlayhead,sessionStartMs}=usePlayPage();return jsxRuntimeExports.jsx(SessionPerfPanel,{sessionId,mode,screenshots,enforceEnvelope,onEnforceEnvelopeChange,gameLogsData:gameLogs.data,controllerLogsData:controllerLogs.data,currentTime:playhead?.time??null,sessionStartMs,playheadSource:playhead?.source??null,onGraphPlayhead})},PlayerPanelView=_=>{const{isLoading,mode,failedMessage,toggleConnection,selectedGame,selectedChannel,loadingProgress}=usePlayPage();return jsxRuntimeExports.jsx(PagePlayer,{loading:isLoading,mode,failedMessage,onToggleConnection:toggleConnection,disabled:!selectedGame||!selectedChannel,loadingProgress})},LogsPanelView=_=>{const{sessionId}=usePlayPage();return jsxRuntimeExports.jsx(PageContent,{sessionId})},QrCodePanelView=_=>{const{mode,qrCodeUrl,passport,showSSIC,setShowSSIC,controllerEnv,setControllerEnv,ssicWindowConfig,sideloadedControllerUrl,setSsicWindowConfig,controllerOptions,selectedController,setSelectedController,testbedVersion,setTestbedVersion}=usePlayPage();return jsxRuntimeExports.jsx(SSICQrCode,{hideToolbar:!0,mode,qrCodeUrl,passport,showSSIC,setShowSSIC,controllerEnv,setControllerEnv,ssicWindowConfig,sideloadedControllerUrl,setSsicWindowConfig,controllerOptions,selectedController,setSelectedController,testbedVersion,setTestbedVersion})},NetworkPanelView=_=>{const{sessionId,selectedGame}=usePlayPage(),gameId=selectedGame?.value?Number(selectedGame.value):void 0;return jsxRuntimeExports.jsx(NetworkActivityTable,{gameId,sessionId})},SessionOverviewPanelView=_=>jsxRuntimeExports.jsx(SessionOverviewPanel,{}),SettingsPanelView=props=>{const{isDisconnected,selectedGame,selectedEnvOptions,setSessionSettings,setSelectedEnvOptions}=usePlayPage();return jsxRuntimeExports.jsx(SettingsPanel,{playing:!isDisconnected,gameId:selectedGame?.value??"",selectedEnvOptions,onSaveSettings:setSessionSettings,onSaveEnvVars:setSelectedEnvOptions,onClose:()=>props.api.close()})},DOCK_COMPONENTS={perf:PerfPanelView,network:NetworkPanelView,player:PlayerPanelView,logs:LogsPanelView,qr:QrCodePanelView,overview:SessionOverviewPanelView,settings:SettingsPanelView},tabBtnStyle={display:"flex",alignItems:"center",justifyContent:"center",width:20,height:20,background:"none",border:"none",cursor:"pointer",borderRadius:3,padding:0,color:"rgba(255,255,255,0.5)",flexShrink:0},PINNED_PANELS=new Set(["player"]);function injectStylesIntoWindow(targetWindow){const doc=targetWindow.document;document.querySelectorAll('link[rel="stylesheet"], style').forEach(node=>{doc.head.appendChild(node.cloneNode(!0))})}const DockTabHeader=({api,containerApi})=>{const isPinned=PINNED_PANELS.has(api.id),handlePopout=()=>{const panel2=containerApi.getPanel(api.id);if(!panel2)return;const{onPopout}=api.getParameters();onPopout?.(api.id,!0),containerApi.addPopoutGroup(panel2,{onDidOpen:({window:popoutWindow})=>{injectStylesIntoWindow(popoutWindow)},onWillClose:()=>{onPopout?.(api.id,!1)}})};return jsxRuntimeExports.jsxs("div",{style:{display:"flex",alignItems:"center",gap:2,height:"100%",padding:"0 6px",minWidth:0},children:[jsxRuntimeExports.jsx("span",{style:{fontFamily:"var(--hawkins-typography-font-family-sans)",fontSize:"var(--hawkins-typography-font-size-10)",fontWeight:"var(--hawkins-typography-font-weight-500)",lineHeight:"var(--hawkins-typography-line-height-1-5)",color:"var(--hawkins-theme-foreground)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:1},children:api.title}),!isPinned&&jsxRuntimeExports.jsx("button",{style:tabBtnStyle,title:"Pop out panel",onClick:handlePopout,children:jsxRuntimeExports.jsx(IconLinkOut,{width:12,height:12})}),!isPinned&&jsxRuntimeExports.jsx("button",{style:tabBtnStyle,title:"Close panel",onClick:()=>containerApi.getPanel(api.id)?.group.api.setVisible(!1),children:jsxRuntimeExports.jsx(IconX,{width:12,height:12})})]})},FIXED_PANELS=[{id:"perf",defaultWidth:550},{id:"qr",defaultWidth:230}];function setupFixedPanelWidths(api){const storedWidths={};for(const{id,defaultWidth}of FIXED_PANELS)storedWidths[id]=defaultWidth;function restoreFixedWidths(){for(const{id}of FIXED_PANELS){const panel2=api.getPanel(id),stored=storedWidths[id];panel2&&stored&&panel2.group.api.isVisible&&panel2.group.api.setSize({width:stored})}}let prevContainerWidth=api.width,prevTotalPanels=api.totalPanels;api.onDidLayoutChange(()=>{const currentContainerWidth=api.width,currentTotalPanels=api.totalPanels,containerResized=currentContainerWidth!==prevContainerWidth,panelCountChanged=currentTotalPanels!==prevTotalPanels;if(prevContainerWidth=currentContainerWidth,prevTotalPanels=currentTotalPanels,containerResized||panelCountChanged){requestAnimationFrame(restoreFixedWidths);return}for(const{id}of FIXED_PANELS){const panel2=api.getPanel(id);panel2&&panel2.group.api.isVisible&&panel2.group.api.width>0&&(storedWidths[id]=panel2.group.api.width)}})}function setupDefaultLayout(api){api.addPanel({id:"player",component:"player",title:"Game"}).group.element.classList.add("game-group"),api.addPanel({id:"perf",component:"perf",title:"Performance",position:{direction:"left",referencePanel:"player"},initialWidth:550}),api.addPanel({id:"logs",component:"logs",title:"Logs",position:{direction:"below",referencePanel:"player"}}).group.element.classList.add("logs-group"),api.addPanel({id:"qr",component:"qr",title:"NGC QR Code",position:{direction:"left",referencePanel:"logs"},initialWidth:230}).group.element.classList.add("logs-group"),api.addPanel({id:"overview",component:"overview",title:"Session Overview",position:{direction:"right",referencePanel:"player"},initialWidth:280})}const useOCGAPerfReport=(gameId,buildId)=>useQuery({queryKey:["ocgaperfreport",gameId,buildId],queryFn:async()=>{if(gameId&&buildId)try{const response=await fetch$1(`/api/games/${gameId}/builds/${buildId}/ocgaperfreport`);if(response.status===404)return[];const data=await response.json();if(data.errors&&data.errors.length>0){const error=data.errors[0],errorMessage=`Error ${error.status} - ${error.title}: ${error.detail}`;throw new Error(errorMessage)}return data.data}catch(error){throw console.error("Failed to fetch OCGAPerfReport:",error),error}return[]}}),useBuildStateProps=build=>{const buildState=build?.state;return reactExports.useMemo(()=>buildState?buildState!==BuildState.INSTALL_FAILED&&buildState!==BuildState.INSTALL_IN_PROGRESS&&buildState!==BuildState.INSTALL_SUCCEED?{value:"Cannot play the build. Please upload a new build.",color:"red",playable:!1}:buildState===BuildState.INSTALL_FAILED?{value:"Install unsuccessful",color:"red",playable:!1}:buildState===BuildState.INSTALL_IN_PROGRESS?{value:"Install in progress",color:"yellow",playable:!1}:{value:"Active",color:"green",playable:!0}:{value:void 0,playable:!1},[buildState])},SkeletonText=({label:label2,labelProps,value:value2,width,color})=>{const loading=value2===void 0;return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment,{children:[jsxRuntimeExports.jsx(Text,{...labelProps,children:label2})," ",jsxRuntimeExports.jsx(Text,{color,loading,loaderProps:{width},children:value2})]})},PanelMenuDropdown=({showGraphsNetwork,showLogsPanel,showQrPanel,showOverviewPanel,onGraphsNetworkToggle,onLogsToggle,onQrToggle,onOverviewToggle,onAllPanelsToggle,isPerfPopout,isLogsPopout,isQrPopout,isOverviewPopout})=>{const[isOpen,setIsOpen]=reactExports.useState(!1),containerRef=reactExports.useRef(null),controllableStates=[isPerfPopout?null:showGraphsNetwork,isLogsPopout?null:showLogsPanel,isQrPopout?null:showQrPanel,isOverviewPopout?null:showOverviewPanel].filter(v=>v!==null),allChecked=controllableStates.every(Boolean),noneChecked=controllableStates.every(v=>!v),isIndeterminate=!allChecked&&!noneChecked;reactExports.useEffect(()=>{if(!isOpen)return;const handleClickOutside=e=>{containerRef.current&&!containerRef.current.contains(e.target)&&setIsOpen(!1)};return document.addEventListener("mousedown",handleClickOutside),()=>document.removeEventListener("mousedown",handleClickOutside)},[isOpen]);const handleToggle=reactExports.useCallback(()=>setIsOpen(o2=>!o2),[]);return jsxRuntimeExports.jsxs("div",{ref:containerRef,style:{position:"relative"},children:[jsxRuntimeExports.jsx(Button,{variant:"icon",compact:!0,icon:IconCaretDown,"aria-label":"Toggle panel visibility","aria-expanded":isOpen,"aria-haspopup":"menu",onClick:handleToggle,style:{borderTopLeftRadius:0,borderBottomLeftRadius:0,height:40,width:32,backgroundColor:isOpen?"var(--hawkins-theme-surface-selected-subtle)":"var(--hawkins-theme-surface-highlight)",...isOpen?{color:"var(--hawkins-theme-foreground-primary)"}:void 0}}),isOpen&&jsxRuntimeExports.jsxs(Paper,{elevation:2,role:"menu",style:{position:"absolute",top:"calc(100% + 4px)",right:0,zIndex:1e3,minWidth:220},children:[jsxRuntimeExports.jsx(MenuItem,{onChange:onAllPanelsToggle,children:jsxRuntimeExports.jsx(Checkbox,{label:"All Panels",checked:allChecked,indeterminate:isIndeterminate})}),jsxRuntimeExports.jsx(MenuItem,{onChange:isPerfPopout?void 0:onGraphsNetworkToggle,disabled:isPerfPopout,children:jsxRuntimeExports.jsx(Checkbox,{label:isPerfPopout?"Session Graphs & Networks (in separate window)":"Session Graphs & Networks",checked:showGraphsNetwork,disabled:isPerfPopout})}),jsxRuntimeExports.jsx(MenuItem,{onChange:isQrPopout?void 0:onQrToggle,disabled:isQrPopout,children:jsxRuntimeExports.jsx(Checkbox,{label:isQrPopout?"NGC QR Code (in separate window)":"NGC QR Code",checked:showQrPanel,disabled:isQrPopout})}),jsxRuntimeExports.jsx(MenuItem,{onChange:isLogsPopout?void 0:onLogsToggle,disabled:isLogsPopout,children:jsxRuntimeExports.jsx(Checkbox,{label:isLogsPopout?"Logs (in separate window)":"Logs",checked:showLogsPanel,disabled:isLogsPopout})}),jsxRuntimeExports.jsx(MenuItem,{onChange:isOverviewPopout?void 0:onOverviewToggle,disabled:isOverviewPopout,children:jsxRuntimeExports.jsx(Checkbox,{label:isOverviewPopout?"Session Overview (in separate window)":"Session Overview",checked:showOverviewPanel,disabled:isOverviewPopout})})]})]})},chip="_chip_ln134_1",divider="_divider_ln134_14",buildIcon="_buildIcon_ln134_19",header="_header_ln134_26",gameIcon="_gameIcon_ln134_40",gameName="_gameName_ln134_50",gameIdLabel="_gameIdLabel_ln134_57",sessionChips="_sessionChips_ln134_63",chipText="_chipText_ln134_69",spacer="_spacer_ln134_76",stateAnimated="_stateAnimated_ln134_80",warning="_warning_ln134_96",styles$1={chip,divider,buildIcon,header,gameIcon,gameName,gameIdLabel,sessionChips,chipText,spacer,stateAnimated,warning},newChannelFooter="_newChannelFooter_19qy9_1",styles={newChannelFooter},ChannelDropdownFooter=()=>{const{showModal}=useModal();return jsxRuntimeExports.jsx("div",{className:styles.newChannelFooter,children:jsxRuntimeExports.jsx(Button,{onClick:()=>showModal("newChannel"),variant:"secondary",compact:!0,children:"Create Channel"})})},GameTrigger=reactExports.forwardRef((props,ref)=>{const{onClick,onKeyDown,selected,loading,open}=props,showPlaceholder=!loading&&Array.isArray(selected)&&selected.length===0,selectedArr=Array.isArray(selected)?selected:[],gameName2=loading?"Loading...":showPlaceholder?"Select Game":selectedArr[0]?.label??"",gameId=showPlaceholder?"":selectedArr[0]?.value??"";return jsxRuntimeExports.jsx(Button,{onClick,onKeyDown,ref,variant:"tertiary",style:{padding:`${Dimensions.Space4} ${Dimensions.Space8}`,height:"100%"},children:jsxRuntimeExports.jsxs(Stack,{orientation:"horizontal",gap:Dimensions.Space8,style:{alignItems:"center"},children:[jsxRuntimeExports.jsx("div",{className:styles$1.gameIcon}),jsxRuntimeExports.jsxs(Stack,{orientation:"vertical",gap:0,style:{alignItems:"flex-start"},children:[jsxRuntimeExports.jsx(Text,{variant:"label",colorVariant:"faded",className:styles$1.gameIdLabel,component:"div",children:showPlaceholder?"No game selected":`Game ID: ${gameId}`}),jsxRuntimeExports.jsxs(Stack,{orientation:"horizontal",gap:Dimensions.Space4,style:{alignItems:"center"},children:[jsxRuntimeExports.jsx("span",{className:styles$1.gameName,children:gameName2}),open?jsxRuntimeExports.jsx(IconCaretDown,{size:"small",style:{transform:"rotate(180deg)"}}):jsxRuntimeExports.jsx(IconCaretDown,{size:"small"})]})]})]})})}),ChannelTrigger=reactExports.forwardRef((props,ref)=>jsxRuntimeExports.jsx(DropdownTrigger,{...props,hideSubtitle:!0,titleMaxWidth:160,ref})),AccountTrigger=reactExports.forwardRef((props,ref)=>jsxRuntimeExports.jsx(DropdownTrigger,{...props,hideSubtitle:!0,titleMaxWidth:160,ref})),testReportClassname=state=>state==="PENDING"||state==="QUEUED"?styles$1.stateAnimated:"",testReportColorByState=state=>{switch(state){case"PENDING":return Colors.Blue;case"ERROR":return Colors.Red;case"FAILED":return Colors.Red;case"ABORTED":return Colors.Orange;case"RUNNING":return Colors.Indigo;case"SUCCEEDED":return Colors.Green;case"QUEUED":return Colors.Blue;default:return Colors.Gray}},SessionSettingsLabels={ocgaSteeringOverride:"OCGA Steering Override",hardwareVersionSelection:"Hardware Selection",softwareGameDevPool:"Software Version Selection",resolutionOverride:"Resolution Override",fpsOverride:"FPS Override"},PageHeader=({channelOptions,gameOptions,build,mode,areChannelsFetching,areChannelsRefetching,selectedChannelOption,selectedEnvOptions,selectedGameOption,sessionSettings,sessionId,setSelectedGameOption,setSelectedEnvOptions,setSelectedChannelOption,setSessionSettings,savedAccounts,selectedAccount,setSelectedAccount,onToggleConnection,viewMode,onViewModeChange,onSettingsClick,isSettingsPanelOpen,showGraphsNetwork,onGraphsNetworkToggle,showLogsPanel,onLogsToggle,showQrPanel,onQrToggle,showOverviewPanel,onOverviewToggle,onAllPanelsToggle,isPerfPopout,isLogsPopout,isQrPopout,isOverviewPopout,autoPlay,onAutoPlayChange})=>{const{showModal}=useModal(),{isDisconnected}=useStreamingModeInfo(mode),{data:ocgaPerfReport,error:ocgaPerfReportError,isFetched:isPerfReportFetched,isLoading:isPerfReportLoading}=useOCGAPerfReport(selectedGameOption?.value,build?.id??void 0),buildStateProps=useBuildStateProps(build);return Number(selectedEnvOptions?.length??0),useNgpConfig(selectedGameOption?.value),jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment,{children:jsxRuntimeExports.jsxs("div",{className:styles$1.header,children:[jsxRuntimeExports.jsx(Dropdown,{DropdownTrigger:GameTrigger,label:`Game ID: ${selectedGameOption?.value??""}`,onChange:selected=>{selected&&setSelectedGameOption(selected)},options:gameOptions,loading:gameOptions.length===0,value:selectedGameOption,getOptionValue:option=>typeof option=="string"?option:option.value,searchable:gameOptions.length>5,clearSearchOnSelect:!0,filterOptions:getFuzzyFilterOption(gameOptions,{keys:["label","subtitle"],ignoreLocation:!0}),disabled:!isDisconnected,style:{width:"auto"},dropdownWidthType:320},`games-${keyFromOptions(gameOptions)}`),jsxRuntimeExports.jsx(Divider,{variant:"vertical",className:styles$1.divider}),jsxRuntimeExports.jsxs("div",{className:"sr-view-mode-control",children:[jsxRuntimeExports.jsx("div",{className:"sr-toggle-flat",children:jsxRuntimeExports.jsxs(ToggleButtonGroup,{compact:!0,exclusive:!0,value:viewMode==="developer"?"layout":"grid",onChange:(_ev,value2)=>{value2==="grid"?onViewModeChange("grid"):value2==="layout"&&onViewModeChange("developer")},children:[jsxRuntimeExports.jsx(ToggleButton,{value:"grid",icon:IconCompare,children:"Player View"}),jsxRuntimeExports.jsx(ToggleButton,{value:"layout",icon:IconLayout,children:"Dev View"})]})}),viewMode==="developer"&&jsxRuntimeExports.jsx(PanelMenuDropdown,{showGraphsNetwork,showLogsPanel,showQrPanel,onGraphsNetworkToggle,onLogsToggle,onQrToggle,showOverviewPanel,onOverviewToggle,onAllPanelsToggle,isPerfPopout,isLogsPopout,isQrPopout,isOverviewPopout})]}),jsxRuntimeExports.jsx("div",{className:styles$1.spacer}),jsxRuntimeExports.jsxs(Stack,{orientation:"vertical",gap:2,className:styles$1.sessionChips,children:[jsxRuntimeExports.jsx(Tooltip,{label:sessionId?`Session ID: ${sessionId}`:"Session ID: Press 'Play' to generate",children:jsxRuntimeExports.jsx(Chip,{compact:!0,onClick:()=>{sessionId&&window.open(`${ROUTE_SESSIONS}/${sessionId}`,"_blank")},style:{cursor:sessionId?"pointer":void 0},className:styles$1.chip,children:jsxRuntimeExports.jsx("span",{className:styles$1.chipText,children:sessionId?`Session ID: ${sessionId}`:"Session ID: Press 'Play' to generate"})})}),ocgaPerfReport?.state?jsxRuntimeExports.jsx(HoverCardTooltip,{disabled:ocgaPerfReport?.state!=="SUCCEEDED",label:["Performance Report created on","OCGA Instance Count","Report"],description:[new Date(ocgaPerfReport.createTime).toLocaleString(),ocgaPerfReport.instanceCount>0?ocgaPerfReport.instanceCount:"Error",jsxRuntimeExports.jsx(TextLink,{href:ocgaPerfReport.testLink,variant:"standalone",target:"_blank",noWrap:!0,style:{width:250},children:"Open test report"},"testLink")],interactive:!0,children:jsxRuntimeExports.jsx(Chip,{compact:!0,className:styles$1.chip,children:jsxRuntimeExports.jsx(Stack,{gap:Dimensions.RawSpace4,orientation:"horizontal",children:jsxRuntimeExports.jsxs(Text,{component:"div",variant:"label",level:0,children:[jsxRuntimeExports.jsx(Tooltip,{label:ocgaPerfReport.state,children:jsxRuntimeExports.jsx(IconCircleFill,{className:testReportClassname(ocgaPerfReport.state),width:Dimensions.RawSize8,height:Dimensions.RawSize8,style:{marginRight:Dimensions.Space4},color:testReportColorByState(ocgaPerfReport.state)})}),ocgaPerfReport.instanceCount?`OCGA Report (${ocgaPerfReport.instanceCount})`:"OCGA Report"]})})})}):jsxRuntimeExports.jsx(Tooltip,{label:"No OCGA Perf Report",children:jsxRuntimeExports.jsx(Chip,{compact:!0,className:styles$1.chip,loading:(!isPerfReportFetched||isPerfReportLoading)&&!ocgaPerfReportError,children:jsxRuntimeExports.jsx("span",{className:styles$1.chipText,children:"No OCGA Perf Report"})})})]}),jsxRuntimeExports.jsx(Divider,{variant:"vertical",className:styles$1.divider}),jsxRuntimeExports.jsx(Dropdown,{DropdownTrigger:ChannelTrigger,label:jsxRuntimeExports.jsxs(Stack,{component:"span",orientation:"horizontal",style:{alignItems:"center"},gap:Dimensions.RawSpace4,children:[jsxRuntimeExports.jsx(Text,{variant:"label",level:0,component:"div",colorVariant:"faded",children:"Channel"}),build&&jsxRuntimeExports.jsx("span",{className:styles$1.buildIcon,children:jsxRuntimeExports.jsxs(HoverCard,{interactive:!0,children:[jsxRuntimeExports.jsx(HoverCard.Trigger,{children:!build||buildStateProps.playable?jsxRuntimeExports.jsx(IconCircleI,{size:"small","aria-label":"buildinfo"},`buildinfo_${buildStateProps.value}`):jsxRuntimeExports.jsx(IconCircleExclamationPointFill,{size:"small","aria-label":"buildinfo",fill:"var(--icon-fill-information-error)"},`buildinfo_${buildStateProps.value}`)}),jsxRuntimeExports.jsx(HoverCard.Content,{children:jsxRuntimeExports.jsxs(Paper,{children:[jsxRuntimeExports.jsx(Heading,{level:0,children:"Build Details"}),jsxRuntimeExports.jsxs(Text,{colorVariant:"faded",children:["ID: ",build?.id??"N/A"]}),jsxRuntimeExports.jsx("div",{style:{display:"flex"},children:jsxRuntimeExports.jsx(SkeletonText,{label:"Status:",labelProps:{colorVariant:"faded"},value:buildStateProps.value??"N/A",color:buildStateProps.color,width:"130px"})}),jsxRuntimeExports.jsx(Text,{colorVariant:"faded",children:`Last update: ${build?.updatedDate?new Date(build.updatedDate).toLocaleString():"N/A"}`}),jsxRuntimeExports.jsxs(Text,{colorVariant:"faded",children:["Updated By: ",build?.submitter??"N/A"]}),jsxRuntimeExports.jsxs(Text,{colorVariant:"faded",children:["Size: ",formatBytes(build?.size)]})]})})]})})]}),onChange:selected=>{selected&&setSelectedChannelOption(selected)},groupBy:option=>option.group??"",sortGroups:(a,b)=>a==="Playable"&&b==="Upload required"?-1:a==="Upload required"&&b==="Playable"?1:0,options:channelOptions,loading:channelOptions.length===0,value:selectedChannelOption,showRecentlySelected:"only-when-empty-query",recentlySelectedGroupLabel:"Recent selections",searchable:channelOptions.length>5,filterOptions:getFuzzyFilterOption(channelOptions,{keys:["label","subtitle","buildId"]}),getOptionSubtitle:option=>option?.subtitle,disabled:!isDisconnected,style:{width:"auto"},dropdownWidthType:320,DropdownListFooter:()=>channelOptions.length?jsxRuntimeExports.jsx(ChannelDropdownFooter,{}):jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment,{})},`channels-${keyFromOptions(channelOptions)}`),jsxRuntimeExports.jsx(Divider,{variant:"vertical",className:styles$1.divider}),jsxRuntimeExports.jsx(Dropdown,{DropdownTrigger:AccountTrigger,label:"Test Account",onChange:selected=>{selected&&setSelectedAccount(selected)},groupBy:()=>"Saved Logins",options:savedAccounts,value:selectedAccount,disabled:!isDisconnected,style:{width:"auto"},dropdownWidthType:280,position:"bottom-end",DropdownListEmptySuggestion:()=>jsxRuntimeExports.jsx(SopAccountDropdownEmpty,{}),DropdownListItem:props=>jsxRuntimeExports.jsx(SopAccountDropdownItem,{...props}),DropdownListFooter:()=>savedAccounts.length?jsxRuntimeExports.jsx(SopAccountDropdownFooter,{}):jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment,{})},`login-as-${keyFromOptions(savedAccounts)}`),jsxRuntimeExports.jsx(Divider,{variant:"vertical",className:styles$1.divider}),Object.keys(sessionSettings||{}).length>0&&jsxRuntimeExports.jsxs(HoverCard,{children:[jsxRuntimeExports.jsx(HoverCard.Trigger,{children:jsxRuntimeExports.jsxs(Button,{compact:!0,className:clsx(styles$1.chip,styles$1.warning),onClick:onSettingsClick,children:[jsxRuntimeExports.jsx(IconWarningFill,{size:"small"}),"Override"]})}),jsxRuntimeExports.jsx(HoverCard.Content,{children:jsxRuntimeExports.jsx(Paper,{elevation:2,children:jsxRuntimeExports.jsx(Stack,{gap:Dimensions.Space8,children:Object.keys(sessionSettings||{}).map(key=>jsxRuntimeExports.jsxs(Stack,{children:[jsxRuntimeExports.jsx(Heading,{level:0,children:SessionSettingsLabels[key]}),jsxRuntimeExports.jsx(Text,{children:sessionSettings?.[key]})]},key))})})})]}),jsxRuntimeExports.jsx(SplitButton,{primaryActionLabel:isDisconnected?"Play":"Stop",primaryActionHandler:onToggleConnection,icon:isDisconnected?IconPlay:IconStop,variant:"primary",buttonProps:isDisconnected?void 0:{variant:"primary-destructive"},menuTriggerProps:isDisconnected?void 0:{variant:"primary-destructive"},primaryActionDisabled:!!(!selectedGameOption||!selectedChannelOption||areChannelsFetching),executing:areChannelsRefetching,children:jsxRuntimeExports.jsx(MenuItem,{onChange:()=>onAutoPlayChange(!autoPlay),disabled:!isDisconnected,children:jsxRuntimeExports.jsx(Checkbox,{label:"Auto Play",checked:autoPlay,disabled:!isDisconnected})})}),jsxRuntimeExports.jsx(Tooltip,{label:"Toggle session settings for OCGA steering, video settings and environment variables.",children:jsxRuntimeExports.jsx(Button,{"aria-label":"Settings",icon:IconSettings,variant:"icon",onClick:onSettingsClick,style:isSettingsPanelOpen?{backgroundColor:"var(--hawkins-theme-surface-highlight)",color:"var(--hawkins-theme-foreground-primary)",borderRadius:"var(--hawkins-dimensions-border-radius-4)"}:void 0})})]})})},stageByMetricName={"player.stage.signaling_ms":"signaling","player.stage.webrtc_ms":"webrtc","player.stage.first_frame_ms":"first_frame"},toastInfoByGameErrorCode={[ErrorCode.COULD_NOT_CONNECT_TO_ANY_SIGNALING_SERVER]:{title:"Connection Failed",body:"Could not connect to the gaming server. This may be due to network issues, firewall restrictions, or high latency. Please check your network connection and try again."},[ErrorCode.FAILED_TO_CONNECT_TO_SIGNALING_SERVER]:{title:"Connection Failed",body:"Failed to connect to the signaling server. Please check your network connection and try again."},[ErrorCode.STUN_BLOCKED]:{title:"Network Blocked",body:"WebRTC connections are blocked. Please check your firewall or network settings."},[ErrorCode.STUN_BLOCKED_PORT_RANGE]:{title:"Network Blocked",body:"Required network ports are blocked. Please check your firewall settings."},[ErrorCode.TIMEOUT_ESTABLISHING_CONNECTION]:{title:"Connection Timeout",body:"The connection timed out. This may be due to high latency or network issues."},[ErrorCode.NO_ICE_CANDIDATES]:{title:"Connection Failed",body:"Could not establish a peer-to-peer connection. Please check your network settings."}},CG_GAME_ID="cgGameId",CG_BUILD_ID="cgBuildId",CG_OCGA_SHORT_NAME="cgOcgaShortName",CG_ERROR_TYPE="cgErrorType",CG_ERROR_CODE="cgErrorCode",CG_ERROR_STAGE="cgErrorStage",CG_STAGE="cgStage",CG_END_REASON="cgEndReason",Play=()=>{const queryParams=reactExports.useMemo(()=>new URLSearchParams(window.location.search),[]),autoConnect=reactExports.useMemo(()=>queryParams.has("autoConnect"),[queryParams]),{headless,enableLoadCustomTestbedVersion,controllerBeacon,networkValidation}=useFeature(),{open:isSessionTimelineOpen,onExpand:onSessionTimelineExpand,onCollapse:onSessionTimelineCollapse}=useSessionTimelinePanel(),gamingClient=useGamingClient(),[mode,setMode]=reactExports.useState(StreamingMode.INITIAL),{isDisconnected,isLoading}=useStreamingModeInfo(mode),[failedMessage,setFailedMessage]=reactExports.useState(void 0),[failedSession,setFailedSession]=reactExports.useState(!1),{channelOptions,areChannelsFetching,areChannelsRefetching,setSelectedChannel,selectedChannel,refetchChannels,gameOptions,activeBuild,selectedGame,setSelectedGame}=useGameChannels(),{savedAccounts,selectedAccount,setSelectedAccount,isLoading:sopLoading}=useSopAccounts(),{selectedEnvOptions,setSelectedEnvOptions}=useEnvOptions({selectedGame}),{sessionSettings,setSessionSettings}=useSessionSettings(),[autoPlay,setAutoPlay]=reactExports.useState(!1),telemetry=useTelemetry();telemetry.setLoggingTag("gdt-portal",headless?"Play-headless-toolkit":"Play"),useWakeLock(!isDisconnected),reactExports.useEffect(()=>{selectedGame&&gamingClient.setGameId(Number(selectedGame.value))},[selectedGame,gamingClient]),reactExports.useEffect(()=>{selectedChannel&&(gamingClient.setChannelName(selectedChannel.label),gamingClient.setChannelId(selectedChannel.value)),activeBuild&&gamingClient.setBuildId(activeBuild.id)},[selectedChannel,activeBuild,gamingClient]),reactExports.useEffect(()=>{setFailedMessage(failedSession&&selectedGame?`Cannot play game (Are you sure you uploaded a game for this branch (GameId: ${selectedGame.value}, Name: ${selectedGame.label}))`:void 0)},[failedSession,selectedGame]);const[sessionId,setSessionId]=reactExports.useState(),[sessionStartMs,setSessionStartMs]=reactExports.useState(0);reactExports.useEffect(()=>{sessionId&&setSessionStartMs(Date.now())},[sessionId]);const[playhead,setPlayhead]=reactExports.useState(null),onGraphPlayhead=reactExports.useCallback(time=>{setPlayhead({time,source:"graph"})},[]),onLogPlayhead=reactExports.useCallback(time=>{setPlayhead({time,source:"log"})},[]),gameLogs=useSessionGameLogs({sessionId,live:!0,disabled:!sessionId||mode!==StreamingMode.OPEN}),controllerLogs=useControllerLogs({sessionId,disabled:!sessionId||mode!==StreamingMode.OPEN}),clientId=useUniqueClientId(),{data:passportData,error:passportError,isError:isPassportError}=usePassport(selectedAccount?.value,clientId),{data:controllerQRCode,error,isError}=useControllerQRCode({gameId:selectedGame?.value,cloudGameToken:gamingClient.getBeaconToken(),passport:passportData?.data});reactExports.useEffect(()=>{isError&&error&&(console.error(error),telemetry.trackError(error),createError({title:"Error generating QR Code",body:`${error.message}`,options:{duration:3500,id:"controller-qr-code-error"}}))},[error,isError,telemetry]),reactExports.useEffect(()=>{isPassportError&&passportError&&telemetry.trackError(passportError)},[isPassportError,passportError,telemetry]);const[ssicWindowConfig,setSsicWindowConfig]=reactExports.useState({minSSIC:1,maxSSIC:4}),{controllerOptions,sideloadedControllerUrl,selectedController,setSelectedController}=useGameControllers(selectedGame?.value,activeBuild?.key),{showSSIC,setShowSSIC,controllerEnv,setControllerEnv,testbedVersion,setTestbedVersion}=useSsicWindow({qrCodeUrl:controllerQRCode?.qrCodeUrl,config:ssicWindowConfig,passport:passportData?.data}),handleSetSelectedController=reactExports.useCallback(controllerId=>{const option=controllerOptions.find(option2=>option2.value===controllerId);option&&(gamingClient.setQrCodeConfig(option.config),setSelectedController(option.value))},[controllerOptions,gamingClient.setQrCodeConfig,setSelectedController]),firstMount=reactExports.useRef(!0),successCountedSessionIdRef=reactExports.useRef(void 0),sessionStartedAtMsRef=reactExports.useRef(void 0),sessionEndedSessionIdRef=reactExports.useRef(void 0),sessionContextRef=reactExports.useRef(void 0),gameEnvs=reactExports.useMemo(()=>{const envs=selectedEnvOptions.filter(option=>option.enabled!==!1).map(option=>({key:option.key,value:option.value}));return autoPlay&&envs.push({key:"NFLX_AUTOPLAY_MODE",value:"TRUE"}),envs},[selectedEnvOptions,autoPlay]),ocgas=reactExports.useMemo(()=>sessionSettings.ocgaSteeringOverride?[sessionSettings.ocgaSteeringOverride]:void 0,[sessionSettings.ocgaSteeringOverride]),ocgaOverrides=reactExports.useMemo(()=>({gameEnvs,ocgas,hardwareVersionSelection:sessionSettings.hardwareVersionSelection,softwareGameDevPool:sessionSettings.softwareGameDevPool,resolutionOverride:sessionSettings.resolutionOverride,fpsOverride:sessionSettings.fpsOverride}),[gameEnvs,ocgas,sessionSettings.hardwareVersionSelection,sessionSettings.softwareGameDevPool,sessionSettings.resolutionOverride,sessionSettings.fpsOverride]),setTelemetryGameAndBuildContext=reactExports.useCallback((gameId,buildId)=>{telemetry.setContext(CG_GAME_ID,gameId?String(gameId):null),telemetry.setContext(CG_BUILD_ID,buildId??null)},[telemetry]),setTelemetryErrorContext=reactExports.useCallback(error2=>{const errorType=(e=>{switch(!0){case e instanceof GameError:return"game_error";case e instanceof StartGameError:return"start_game_error";case e instanceof BuildSelectionMismatchError:return"build_selection_mismatch";default:return"unknown"}})(error2);telemetry.setContext(CG_ERROR_TYPE,errorType),telemetry.setContext(CG_ERROR_CODE,null),telemetry.setContext(CG_ERROR_STAGE,"unknown"),telemetry.setContext(CG_OCGA_SHORT_NAME,null),error2 instanceof GameError&&(telemetry.setContext(CG_ERROR_CODE,String(error2.code)),telemetry.setContext(CG_ERROR_STAGE,error2.diagnostics?.stage??"unknown"),telemetry.setContext(CG_OCGA_SHORT_NAME,error2.diagnostics?.ocgaShortName??null))},[telemetry]),trackPlayerStreamFailure=reactExports.useCallback(error2=>{telemetry.trackCount("player.stream_failure",1),telemetry.trackError(error2)},[telemetry]),forwardPlayerLogToTelemetry=reactExports.useCallback(logEntry=>{const logMessage=`[Player/${logEntry.topic}] ${logEntry.message}`;logEntry.level>=LogLevel.ERROR?telemetry.logger.error(logMessage):logEntry.level>=LogLevel.WARN?telemetry.logger.warn(logMessage):logEntry.level>=LogLevel.INFO?telemetry.logger.info(logMessage):telemetry.logger.debug(logMessage)},[telemetry]),trackPlayerMetric=reactExports.useCallback(metric=>{telemetry.setContext(CG_GAME_ID,String(metric.metadata.gameId)),telemetry.setContext(CG_BUILD_ID,metric.metadata.buildId||null),telemetry.setContext(CG_OCGA_SHORT_NAME,metric.metadata.ocgaShortName??null);const stage=stageByMetricName[metric.name]??null;stage?(telemetry.setContext(CG_STAGE,stage),telemetry.trackDuration("player.stage_duration_ms",metric.valueMs)):(telemetry.setContext(CG_STAGE,null),telemetry.trackDuration(metric.name,metric.valueMs))},[telemetry]),trackPlayerStreamSuccessOncePerSession=reactExports.useCallback(metric=>{if(metric.name!=="player.ttff_ms")return;const sessionId2=gamingClient.getGamePlaySessionId();successCountedSessionIdRef.current!==sessionId2&&(successCountedSessionIdRef.current=sessionId2,sessionStartedAtMsRef.current=Date.now(),sessionEndedSessionIdRef.current=void 0,sessionContextRef.current=metric.metadata,telemetry.trackCount("player.stream_success",1))},[gamingClient,telemetry]),processTestbedVersion=()=>{const version=testbedVersion.trim();if(!(!enableLoadCustomTestbedVersion||version===""||version===TESTBED_VERSION_LATEST))return version},{loadingProgress}=useGamingClientMonitor(mode===StreamingMode.CONNECTING&&!sopLoading,gamingClient,{sopAccountEmail:selectedAccount?.value??"",sopAccountPin:selectedAccount?.pin??"",buildId:activeBuild?.id??"",controllerEnv,testbedVersion:processTestbedVersion(),ocgaOverrides,onError:e=>{console.error(e);const gameId=selectedGame?.value?Number(selectedGame.value):void 0,buildId=activeBuild?.id;if(setTelemetryGameAndBuildContext(gameId,buildId),setTelemetryErrorContext(e),trackPlayerStreamFailure(e),e instanceof BuildSelectionMismatchError){createWarning({title:e.title,body:e.message||void 0,options:{id:"build-selection-mismatch-error"}});return}if(e instanceof StartGameError)createError({title:e.title,body:e.message||void 0,options:{id:"start-game-error"}});else if(e instanceof GameError){const errorInfo=toastInfoByGameErrorCode[e.code]||{title:"Game Error",body:e.message||`An error occurred (code: ${e.code})`};createError({title:errorInfo.title,body:errorInfo.body,options:{id:`game-error-${e.code}`}})}disconnect("error")},onLog:forwardPlayerLogToTelemetry,onMetric:metric=>{trackPlayerMetric(metric),trackPlayerStreamSuccessOncePerSession(metric)},logForwardingOptions:{minLevel:LogLevel.DEBUG}});reactExports.useEffect(()=>{let currentSessionId;const handleSessionCreate=()=>{const sessionId2=gamingClient.getGamePlaySessionId();setSessionId(sessionId2)},handlePlaying=()=>{const sessionId2=gamingClient.getGamePlaySessionId();if(currentSessionId!==sessionId2&&(currentSessionId=sessionId2,setSessionId(sessionId2),setMode(StreamingMode.OPEN),setPerformanceSummary(null),headless))try{const ocgaURL=gamingClient.getGamingAppliance()?.hostInfo?.url,beaconToken=gamingClient.getBeaconToken(),gamingStartToken=gamingClient.getGamingStartToken(),sessionDetails={sessionId:sessionId2,ocgaURL,gamingStartToken,beaconToken};globalThis.window.AppAPI.setSessionDetails(sessionDetails)}catch(error2){console.error(error2),telemetry.trackError(error2)}},handleAutoPlayBlocked=()=>setMode(StreamingMode.AUTOPLAY_BLOCKED),handleBeforeUnload=()=>{disconnect("unload")};return gamingClient.addEventListener("sessionCreate",handleSessionCreate),gamingClient.addEventListener("playing",handlePlaying),gamingClient.addEventListener("autoplayblocked",handleAutoPlayBlocked),window.addEventListener("beforeunload",handleBeforeUnload),firstMount.current?(window.netflix=window.netflix??{},window.netflix.gamingClient=gamingClient,firstMount.current=!1,autoConnect&&start()):autoConnect&&mode===StreamingMode.INITIAL&&start(),()=>{gamingClient.removeEventListener("sessionCreate",handleSessionCreate),gamingClient.removeEventListener("playing",handlePlaying),gamingClient.removeEventListener("autoplayblocked",handleAutoPlayBlocked),window.removeEventListener("beforeunload",handleBeforeUnload)}},[gamingClient,headless,mode,autoConnect,telemetry]);const start=reactExports.useCallback(()=>{if(telemetry.trackFeatureEngagement("Play Game","start",{account:selectedAccount?.value,game:Number(selectedGame?.value),channel:selectedChannel?.label}),sessionSettings.ocgaSteeringOverride)telemetry.trackFeatureEngagement("OCGA Steering Override Applied","uuid_override",{gameId:Number(selectedGame?.value),ocgaUUID:sessionSettings.ocgaSteeringOverride});else if(sessionSettings.hardwareVersionSelection){const[hardwareType,environment]=sessionSettings.hardwareVersionSelection.split(":");telemetry.trackFeatureEngagement("OCGA Steering Override Applied","hardware_override",{gameId:Number(selectedGame?.value),hardwareType,environment})}else sessionSettings.softwareGameDevPool&&telemetry.trackFeatureEngagement("OCGA Steering Override Applied","software_pool_override",{gameId:Number(selectedGame?.value),softwareGameDevPool:sessionSettings.softwareGameDevPool});setFailedSession(!1),setMode(StreamingMode.CONNECTING)},[selectedAccount,selectedGame,selectedChannel,sessionSettings,telemetry]),disconnect=reactExports.useCallback((reason="unknown")=>{const startedSessionId=successCountedSessionIdRef.current,startedAtMs=sessionStartedAtMsRef.current,ctx=sessionContextRef.current;if(!startedSessionId||!startedAtMs||sessionEndedSessionIdRef.current===startedSessionId){gamingClient.close(),setMode(StreamingMode.CLOSED),setShowSSIC(!1);return}sessionEndedSessionIdRef.current=startedSessionId,telemetry.setContext(CG_END_REASON,reason),ctx&&(telemetry.setContext(CG_GAME_ID,String(ctx.gameId)),telemetry.setContext(CG_BUILD_ID,ctx.buildId||null),telemetry.setContext(CG_OCGA_SHORT_NAME,ctx.ocgaShortName??null)),telemetry.trackCount("player.session_end",1),telemetry.trackDuration("player.session_duration_ms",Date.now()-startedAtMs),gamingClient.close(),setMode(StreamingMode.CLOSED),setShowSSIC(!1)},[gamingClient,setShowSSIC,telemetry]);reactExports.useEffect(()=>()=>{disconnect("unmount")},[disconnect]);const toggleConnection=reactExports.useCallback(event=>{event.target.blur(),(async()=>{if(isDisconnected)try{await refetchChannels()}catch(error2){console.error(error2),telemetry.trackError(error2)}finally{start()}else disconnect("user_stop")})()},[start,disconnect,isDisconnected,refetchChannels,telemetry]);reactExports.useEffect(()=>{headless&&selectedChannel&&selectedGame&&start()},[start,headless,selectedChannel,selectedGame]);const[viewMode,setViewMode]=reactExports.useState("developer"),[isQrCollapsed,setIsQrCollapsed]=reactExports.useState(!1),[showSettingsPanel,setShowSettingsPanel]=reactExports.useState(!1),[showGraphsNetwork,setShowGraphsNetwork]=reactExports.useState(!0),[showLogsPanel,setShowLogsPanel]=reactExports.useState(!0),[showQrPanel,setShowQrPanel]=reactExports.useState(!0),[showOverviewPanel,setShowOverviewPanel]=reactExports.useState(!1),[popoutPanels,setPopoutPanels]=reactExports.useState(new Set),[dockKey]=reactExports.useState(0),dockApiRef=reactExports.useRef(null),removePanelListenerRef=reactExports.useRef(null),poppingOutRef=reactExports.useRef(new Set);reactExports.useEffect(()=>()=>{removePanelListenerRef.current?.dispose()},[]);const[enableScreenshots,setEnableScreenshots]=reactExports.useState(!0),[captureIntervalMs,setCaptureIntervalMs]=reactExports.useState(DEFAULT_CAPTURE_INTERVAL_MS),[screenshotQuality,setScreenshotQuality]=reactExports.useState(DEFAULT_SCREENSHOT_QUALITY),[enforceEnvelope,setEnforceEnvelope]=reactExports.useState(!0),[resourceDisplayMode,setResourceDisplayMode]=reactExports.useState("percent"),[resourceLimits,setResourceLimits]=reactExports.useState({cpu:100,gpu:100,ram:8192,vram:8192}),[performanceSummary,setPerformanceSummary]=reactExports.useState(null),screenshots=usePeriodicScreenshots(mode,enableScreenshots,captureIntervalMs,screenshotQuality),playPageContext={sessionId,mode,activeBuild,isLoading,isDisconnected,failedMessage,loadingProgress,toggleConnection,selectedGame,selectedChannel,qrCodeUrl:controllerQRCode?.qrCodeUrl,passport:passportData?.data,showSSIC,setShowSSIC,controllerEnv,setControllerEnv,ssicWindowConfig,setSsicWindowConfig,sideloadedControllerUrl,controllerOptions,selectedController,setSelectedController:handleSetSelectedController,testbedVersion,setTestbedVersion,selectedEnvOptions,setSessionSettings,setSelectedEnvOptions,screenshots,enableScreenshots,captureIntervalMs,screenshotQuality,onEnableScreenshotsChange:setEnableScreenshots,onCaptureIntervalChange:setCaptureIntervalMs,onScreenshotQualityChange:setScreenshotQuality,enforceEnvelope,onEnforceEnvelopeChange:setEnforceEnvelope,resourceDisplayMode,onResourceDisplayModeChange:setResourceDisplayMode,resourceLimits,onResourceLimitsChange:setResourceLimits,performanceSummary,setPerformanceSummary,gameLogs,controllerLogs,playhead,onGraphPlayhead,onLogPlayhead,sessionStartMs},handlePanelPopout=reactExports.useCallback((panelId,isPopped)=>{isPopped?poppingOutRef.current.add(panelId):poppingOutRef.current.delete(panelId),setPopoutPanels(prev=>{const next=new Set(prev);return isPopped?next.add(panelId):next.delete(panelId),next})},[]),handleGraphsNetworkToggle=reactExports.useCallback(()=>{const api=dockApiRef.current;if(!api)return;const perfPanel=api.getPanel("perf");if(perfPanel){const nextVisible=!showGraphsNetwork;perfPanel.group.api.setVisible(nextVisible),setShowGraphsNetwork(nextVisible)}else api.addPanel({id:"perf",component:"perf",title:"Performance",position:{direction:"left",referencePanel:"player"},initialWidth:550}),networkValidation&&(api.addPanel({id:"network",component:"network",title:"Network Activity",position:{direction:"within",referencePanel:"perf"},inactive:!0}),api.getPanel("perf")?.api.setActive()),setShowGraphsNetwork(!0)},[networkValidation,showGraphsNetwork]),handleLogsToggle=reactExports.useCallback(()=>{const api=dockApiRef.current;if(!api)return;const panel2=api.getPanel("logs");if(panel2){const nextVisible=!showLogsPanel;panel2.group.api.setVisible(nextVisible),setShowLogsPanel(nextVisible)}else api.addPanel({id:"logs",component:"logs",title:"Logs",position:{direction:"below",referencePanel:"player"}}).group.element.classList.add("logs-group"),setShowLogsPanel(!0)},[showLogsPanel]),handleQrToggle=reactExports.useCallback(()=>{const api=dockApiRef.current;if(!api)return;const panel2=api.getPanel("qr");if(panel2){const nextVisible=!showQrPanel;panel2.group.api.setVisible(nextVisible),setShowQrPanel(nextVisible)}else api.addPanel({id:"qr",component:"qr",title:"NGC QR Code",position:api.getPanel("logs")?{direction:"left",referencePanel:"logs"}:{direction:"below",referencePanel:"player"},initialWidth:230}).group.element.classList.add("logs-group"),setShowQrPanel(!0)},[showQrPanel]),handleOverviewToggle=reactExports.useCallback(()=>{const api=dockApiRef.current;if(!api)return;const panel2=api.getPanel("overview");if(panel2){const nextVisible=!showOverviewPanel;panel2.group.api.setVisible(nextVisible),setShowOverviewPanel(nextVisible)}else api.addPanel({id:"overview",component:"overview",title:"Session Overview",position:{direction:"right",referencePanel:"player"},initialWidth:280}),setShowOverviewPanel(!0)},[showOverviewPanel]),handleAllPanelsToggle=reactExports.useCallback(()=>{showGraphsNetwork&&showLogsPanel&&showQrPanel&&showOverviewPanel?(handleGraphsNetworkToggle(),handleLogsToggle(),handleQrToggle(),handleOverviewToggle()):(showLogsPanel||handleLogsToggle(),showQrPanel||handleQrToggle(),showGraphsNetwork||handleGraphsNetworkToggle(),showOverviewPanel||handleOverviewToggle())},[showGraphsNetwork,showLogsPanel,showQrPanel,showOverviewPanel,handleGraphsNetworkToggle,handleLogsToggle,handleQrToggle,handleOverviewToggle]),handleViewModeChange=reactExports.useCallback(mode2=>{setViewMode(mode2);const api=dockApiRef.current;if(api)if(mode2==="grid"){const playerPanel=api.getPanel("player");playerPanel&&api.maximizeGroup(playerPanel)}else api.hasMaximizedGroup()&&api.exitMaximizedGroup()},[]),handleSettingsToggle=reactExports.useCallback(()=>{const api=dockApiRef.current;if(!api)return;const panel2=api.getPanel("settings");panel2?(panel2.api.close(),setShowSettingsPanel(!1)):(api.addPanel({id:"settings",component:"settings",title:"Settings",position:{direction:"right"},initialWidth:350}),setShowSettingsPanel(!0))},[]);return headless?jsxRuntimeExports.jsx("div",{style:{width:"100vw",height:"100vh",overflow:"hidden"},children:jsxRuntimeExports.jsx(Content,{layout:{padding:0},style:{width:"100%",height:"100%"},children:jsxRuntimeExports.jsx("div",{id:"video-container",style:{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"},children:jsxRuntimeExports.jsx(PagePlayer,{loading:isLoading,mode,failedMessage,disabled:!0,fullWindow:!0,loadingProgress})})})}):jsxRuntimeExports.jsxs(Content,{layout:{padding:0},children:[jsxRuntimeExports.jsx(Background,{}),jsxRuntimeExports.jsx(Layout,{horizontal:!0,children:jsxRuntimeExports.jsx(Layout,{full:!0,children:jsxRuntimeExports.jsxs("div",{style:{position:"relative",display:"flex",flexDirection:"column",height:"100%"},children:[jsxRuntimeExports.jsx(PageHeader,{mode,build:activeBuild,sessionId,setSelectedGameOption:setSelectedGame,selectedGameOption:selectedGame,gameOptions,setSelectedChannelOption:setSelectedChannel,selectedChannelOption:selectedChannel,areChannelsFetching,areChannelsRefetching,channelOptions,selectedEnvOptions,setSelectedEnvOptions,sessionSettings,setSessionSettings,savedAccounts,selectedAccount,setSelectedAccount,onToggleConnection:toggleConnection,viewMode,onViewModeChange:handleViewModeChange,onSettingsClick:handleSettingsToggle,isSettingsPanelOpen:showSettingsPanel,showGraphsNetwork,onGraphsNetworkToggle:handleGraphsNetworkToggle,showLogsPanel,onLogsToggle:handleLogsToggle,showQrPanel,onQrToggle:handleQrToggle,showOverviewPanel,onOverviewToggle:handleOverviewToggle,onAllPanelsToggle:handleAllPanelsToggle,isPerfPopout:popoutPanels.has("perf"),isLogsPopout:popoutPanels.has("logs"),isQrPopout:popoutPanels.has("qr"),isOverviewPopout:popoutPanels.has("overview"),autoPlay,onAutoPlayChange:setAutoPlay}),jsxRuntimeExports.jsxs(PlayPageProvider,{value:playPageContext,children:[performanceSummary&&jsxRuntimeExports.jsx(SessionSummaryBanner,{summary:performanceSummary,onDismiss:()=>setPerformanceSummary(null)}),jsxRuntimeExports.jsx("div",{className:"sr-dock-container dockview-theme-abyss",children:jsxRuntimeExports.jsx(DockviewReact,{components:DOCK_COMPONENTS,defaultTabComponent:DockTabHeader,onReady:event=>{dockApiRef.current=event.api,setupDefaultLayout(event.api),setupFixedPanelWidths(event.api),event.api.getPanel("overview")?.group.api.setVisible(!1),networkValidation&&(event.api.addPanel({id:"network",component:"network",title:"Network Activity",position:{direction:"within",referencePanel:"perf"},inactive:!0}),event.api.getPanel("perf")?.api.setActive()),removePanelListenerRef.current=event.api.onDidRemovePanel(panel2=>{poppingOutRef.current.has(panel2.id)||(panel2.id==="perf"&&setShowGraphsNetwork(!1),panel2.id==="settings"&&setShowSettingsPanel(!1),panel2.id==="logs"&&setShowLogsPanel(!1),panel2.id==="qr"&&setShowQrPanel(!1),panel2.id==="overview"&&setShowOverviewPanel(!1))}),["perf","logs","qr"].forEach(panelId=>{const panel2=event.api.getPanel(panelId);panel2&&panel2.group.api.onDidVisibilityChange(({isVisible})=>{poppingOutRef.current.has(panelId)||(panelId==="perf"&&setShowGraphsNetwork(isVisible),panelId==="logs"&&setShowLogsPanel(isVisible),panelId==="qr"&&setShowQrPanel(isVisible))})}),["perf","logs","qr","overview"].forEach(panelId=>{event.api.getPanel(panelId)?.api.updateParameters({onPopout:handlePanelPopout})})}},dockKey)})]}),viewMode==="grid"&&jsxRuntimeExports.jsx("div",{className:"sr-qr-overlay",children:isQrCollapsed?jsxRuntimeExports.jsxs("div",{className:"sr-toolbar",children:[jsxRuntimeExports.jsx(Button,{compact:!0,variant:"icon",icon:IconCollapsePanelUp,"aria-label":"Expand panel",onClick:()=>setIsQrCollapsed(!1)}),jsxRuntimeExports.jsx("span",{children:"NGC QR Code"})]}):jsxRuntimeExports.jsx(SSICQrCode,{mode,qrCodeUrl:controllerQRCode?.qrCodeUrl,passport:passportData?.data,showSSIC,setShowSSIC,controllerEnv,setControllerEnv,ssicWindowConfig,sideloadedControllerUrl,setSsicWindowConfig,controllerOptions,selectedController,setSelectedController:handleSetSelectedController,testbedVersion,setTestbedVersion,onCollapse:()=>setIsQrCollapsed(!0),collapseIcon:IconCollapsePanelDown})})]})})})]})};export{Play,Play as default};
//# sourceMappingURL=index-Y4llPcQR.js.map
