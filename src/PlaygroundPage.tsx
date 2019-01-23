import { RouteComponentProps } from "@reach/router"
import { device } from "./contracts"
import { parse } from "query-string"
import * as React from "react"
import { HTMLAttributes, useEffect, useState } from "react"
import { ScalableIframe } from "./ScalableIFrame"
import { ViewScaler } from "./ViewScaler"
import { Trail } from "react-spring"
import { easeCubicInOut } from "d3-ease"
import { Timeout } from "./Timeout"




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
			{/*<h1*/}
			{/*className="text-center position-fixed w-100 p-5  _fz-2"*/}
			{/*style={{*/}
			{/*left:   0,*/}
			{/*bottom: 0,*/}
			{/*zIndex: 10,*/}
			{/*}}*/}
			{/*>*/}
			{/*{url}*/}
			{/*</h1>*/}
			
			
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
		/>
		<figcaption>{label}</figcaption>
	</figure>
}


export interface LoaderProps
{
	duration: number
}


export function Loader( { duration }: LoaderProps )
{
	
	return (
		<div
			className={`Loader`}
		>
			
			<div
				className="Loader-progress"
				style={{
					animationDuration: `${duration / 1000}s`,
				}}
			>
			
			</div>
		</div>
	)
}
