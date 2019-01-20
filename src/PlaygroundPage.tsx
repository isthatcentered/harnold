import { Link, RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"
import { HTMLAttributes, useState } from "react"
import { ScalableIframe } from "./ScalableIFrame"
import { ViewScaler } from "./ViewScaler"




export interface PlaygroundPageProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement>
{
	devices: device[]
}


export function PlaygroundPage( { location, navigate, devices, className = "", ...props }: PlaygroundPageProps )
{
	const { url }         = parse( location!.search ) as Partial<{ [ key: string ]: string }>,
	      localStorageKey = "harnold:playground:scale"
	
	if ( !url ) {
		ensureRouterHasSubscribedToLocationThen( () => navigate!( "/" ) )
		return null
	}
	
	const getStoredScaleOrDefault = () => JSON.parse( window.localStorage.getItem( localStorageKey ) || JSON.stringify( 1 ) ),
	      [ scale, __setScale ]   = useState( getStoredScaleOrDefault ),
	      setScale                = ( scale: number ) => {
		      window.localStorage.setItem( localStorageKey, JSON.stringify( scale ) )
		      __setScale( scale )
	      }
	
	return (
		<div
			{...props}
			className={`${className} PlaygroundPage `}
		>
			
			<ViewScaler
				value={scale}
				onScale={setScale}
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
