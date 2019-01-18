import { Link, RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"




export interface PlaygroundPageProps extends RouteComponentProps
{
	devices: device[]
}


interface DeviceProps extends device
{
	src: string
}

function Device( { label, width, height, src }: DeviceProps )
{
	return <figure key={label}>
		{/* https://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/ */}
		<iframe
			sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
			width={width}
			height={height}
			src={src}
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
	
	return (
		<div className="PlaygroundPage">
			{devices.map( ( device: device ) =>
				<Device
					key={device.label}
					src={url}
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