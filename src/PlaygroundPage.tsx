import { Link, RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"
import { useState } from "react"
import { ScalableIframe } from "./ScalableIFrame"




export interface PlaygroundPageProps extends RouteComponentProps
{
	devices: device[]
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


export function PlaygroundPage( { location, navigate, devices }: PlaygroundPageProps )
{
	const { url } = parse( location!.search ) as Partial<{ [ key: string ]: string }>
	
	if ( !url ) {
		ensureRouterHasSubscribedToLocationThen( () => navigate!( "/" ) )
		return null
	}
	
	const [ scale, setScale ] = useState( 100 )
	
	return (
		<div className="PlaygroundPage">
			<div>
			
			<label>
				Scale the devices up or down
				<input type="range"
				       min={30}
				       max={100}
				       value={scale}
				       onChange={( { target: { value } } ) => setScale( parseInt( value ) )}/>
			</label>
			</div>
			
			{devices.map( ( device: device ) =>
				<Device
					key={device.label}
					src={url}
					scale={scale / 100}
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