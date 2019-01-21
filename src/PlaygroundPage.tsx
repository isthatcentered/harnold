import { Link, RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"
import { HTMLAttributes, useEffect, useState } from "react"
import { ScalableIframe } from "./ScalableIFrame"
import { ViewScaler } from "./ViewScaler"




function useResetWindowPosition( watch: any )
{
	useEffect( () => {
		window.scrollTo( 0, 0 )
	}, [ watch ] )
}


export interface PlaygroundPageProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement>
{
	devices: device[]
}


export function PlaygroundPage( { location, navigate, devices, className = "", ...props }: PlaygroundPageProps )
{
	const { url }         = parse( location!.search ) as Partial<{ [ key: string ]: string }>,
	      localStorageKey = "harnold:playground:scale"
	
	if ( !url ) {
		navigate!( "/" )
		return null
	}
	
	useResetWindowPosition( url )
	
	const getStoredScaleOrDefault = () => JSON.parse( window.localStorage.getItem( localStorageKey ) || JSON.stringify( 0.65 ) ),
	      [ scale, __setScale ]   = useState( getStoredScaleOrDefault ),
	      setScale                = ( scale: number ) => {
		      window.localStorage.setItem( localStorageKey, JSON.stringify( scale ) )
		      __setScale( scale )
	      }
	
	return (
		<div
			{...props}
			className={`${className} PlaygroundPage d-flex flex-wrap justify-content-center`}
		>
			<h1
				className="text-center position-fixed w-100 p-5 _bg-fade-in"
				style={{
					left:   0,
					bottom: 0,
					zIndex: 10,
				}}
			>
				{url}
			</h1>
			
			<ViewScaler
				className="position-fixed"
				value={scale}
				onScale={setScale}
			/>
			
			{devices.map( ( device: device ) =>
				<Device
					className="m-0 px-3 pb-4"
					key={device.label}
					src={url}
					scale={scale}
					{...device}
				/> )}
		</div>)
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
		/>
		<figcaption>{label}</figcaption>
	</figure>
}
