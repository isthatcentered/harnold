import { Link, RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"
import { useState } from "react"
import { ScalableIframe } from "./ScalableIFrame"
import { ViewScaler } from "./ViewScaler"




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
			
			<ViewScaler
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
