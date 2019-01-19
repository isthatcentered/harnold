import { Link, RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"
import { ChangeEvent, HTMLAttributes, useState } from "react"
import { ScalableIframe } from "./ScalableIFrame"




export interface PlaygroundPageProps extends RouteComponentProps
{
	devices: device[]
}


export function PlaygroundPage( { location, navigate, devices }: PlaygroundPageProps )
{
	const { url } = parse( location!.search ) as Partial<{ [ key: string ]: string }>
	
	if ( !url ) {
		ensureRouterHasSubscribedToLocationThen( () => navigate!( "/" ) )
		return null
	}
	
	const [ scale, setScale ] = useState( 1 )
	
	return (
		<div className="PlaygroundPage">
			
			<ViewScale
				value={scale}
				onScale={scale => setScale( scale )}
			/>
			
			{devices.map( ( device: device ) =>
				<Device
					key={device.label}
					src={url}
					scale={scale}
					{...device}
				/> )}
			
			<Link to="/">Go to home</Link>
		</div>
	)
}


function ensureRouterHasSubscribedToLocationThen( callback: Function )
{
	process.nextTick( () => callback() )
}



export interface ViewScaleProps extends HTMLAttributes<HTMLDivElement>
{
	onScale: ( scale: number ) => any
	value: number
}


export function ViewScale( { value, onScale }: ViewScaleProps )
{
	const asCssScale     = ( value: string ): number => parseInt( value ) / 100,
	      asPercentScale = ( scale: number ): number => scale * 100,
	      setScale       = ( e: ChangeEvent<HTMLInputElement> ) => onScale( asCssScale( e.target.value ) )
	
	return (
		<div className="ViewScale">
			<label>
				Scale the devices up or down
				<input
					type="range"
					min={30}
					max={100}
					value={asPercentScale( value )}
					onChange={setScale}
				/>
			</label>
		</div>
	)
}



interface DeviceProps extends device
{
	src: string
	scale: number
}


function Device( { label, width, height, src, scale }: DeviceProps )
{
	return <figure className="Device">
		{/* https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/ */}
		<ScalableIframe
			width={width}
			height={height}
			src={src}
			scale={scale}
		/>
		<figcaption>{label}</figcaption>
	</figure>
}
