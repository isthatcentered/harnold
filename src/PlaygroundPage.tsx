import { RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import * as React from "react"
import { HTMLAttributes } from "react"
import { ScalableIframe, ScalableIFrameInteractor } from "./ScalableIFrame"
import { ViewScaler } from "./ViewScaler"
import { Trail } from "react-spring"
import { easeCubicInOut } from "d3-ease"
import { Timeout } from "./Timeout"
import { Loader } from "./Loader"
import { useLocalStorage, useResetWindowPosition, useUrlQuery } from "./hooks"




export interface PlaygroundPageProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement>
{
	devices: device[]
}


export function PlaygroundPage( { location, navigate, devices, className = "", ...props }: PlaygroundPageProps )
{
	
	const { url } = useUrlQuery<{ url: string }>( location!.search )
	
	if ( !url ) {
		navigate!( "/" )
		return null
	}
	
	useResetWindowPosition( url )
	
	const [ scale, setScale ] = useLocalStorage( "harnold:playground:scale", 0.65 )
	
	return (
		<div
			{...props}
			className={`${className} PlaygroundPage`}
		>
			<PlaygroundPageView
				scale={scale}
				devices={devices}
				url={url}
				displayTimeout={2000}
				onScale={setScale}
			/>
		</div>)
}


export interface PlaygroundPageViewProps extends HTMLAttributes<HTMLDivElement>
{
	devices: device[]
	scale: number
	onScale: ( scale: number ) => any
	displayTimeout: number
	url: string
}


export function PlaygroundPageView( { scale, url, onScale, displayTimeout, devices, className = "", ...props }: PlaygroundPageViewProps )
{
	
	return (
		<div
			{...props}
			className={`${className} PlaygroundPageView d-flex flex-wrap justify-content-center`}
		>
			<Timeout
				duration={displayTimeout}
			>
				{done => !done && <div>
					<Loader duration={displayTimeout}/>
					<h1 style={{
						position:  "fixed",
						top:       "50%",
						left:      "50%",
						transform: "translate(-50%,-50%)",
						opacity:   .2,
					}}>
						{url}
					</h1>
				</div>}
			</Timeout>
			
			
			<ViewScaler
				className="position-fixed"
				value={scale}
				onScale={onScale}
			/>
			
			<Trail
				config={{
					tension:  200,
					friction: 40,
					easing:   easeCubicInOut,
					delay:    displayTimeout,
				}}
				items={devices}
				keys={( device: device ) => device.label}
				from={{
					opacity:   0,
					transform: "translateY(400px)",
				}}
				to={{
					opacity:   1,
					transform: "translateY(0)",
				}}
			>
				{device => styles =>
					<Device
						className="m-0 px-3 pb-4"
						style={styles}
						src={url}
						scale={scale}
						{...device}
					/>
				}
			</Trail>
		
		</div>
	)
}


interface DeviceProps extends device, HTMLAttributes<HTMLDivElement>
{
	src: string
	scale: number
}


function Device( { label, width, height, src, scale, className, ...props }: DeviceProps )
{
	return <figure
		{...props}
		className={`${className} Device`}
	>
		{/* https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/ */}
		<ScalableIframe
			width={width}
			height={height}
			src={src}
			scale={scale}
			title={`${label} view of the ${src} website`}
		/>
		<figcaption>{label}</figcaption>
	</figure>
}


export class DeviceInteractor
{
	
	static selector = `Device`
	private _scalebleIframe = new ScalableIFrameInteractor( this._component.getElementsByClassName( ScalableIFrameInteractor.selector )[ 0 ] as HTMLElement )
	
	
	constructor( private _component: HTMLElement )
	{
	}
	
	
	get url()
	{
		return this._scalebleIframe.url
	}
	
	
	isAtScale( scale: number )
	{
		return this._scalebleIframe.isAtScale( scale )
	}
}

