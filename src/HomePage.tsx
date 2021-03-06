import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import { ChangeEventHandler, FormEvent, FormEventHandler, HTMLAttributes, InputHTMLAttributes, useState } from "react"
import "./homePage.scss"




export interface WaveProps extends HTMLAttributes<HTMLDivElement>
{
	active: boolean
}


export function Checkpoint( { active, className = "", children, ...props }: WaveProps )
{
	const stateClasses: string[] = active ?
	                               [ "active" ] :
	                               []
	return (
		<div
			{...props}
			className={`${className} Checkpoint ${stateClasses.join( " " )} `}
		>
			{children}
		</div>
	)
}



export interface HomePageProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement>
{

}


export function HomePage( { navigate, location, className = "", ...props }: HomePageProps )
{
	
	const [ url, setUrl ] = useState( "" )
	
	
	function handleSubmit( e: FormEvent<HTMLFormElement> )
	{
		e.preventDefault()
		
		if ( !url.length )
			return
		
		navigate!( `/playground?url=${ normalizeUrl( url ) }` )
	}
	
	
	function normalizeUrl( url: string ): string
	{
		const urlContainsProtocole = () => url.match( /^(http:\/\/|https:\/\/)/ )
		
		if ( !urlContainsProtocole() )
			return `http://${url}`
		
		return url
	}
	
	
	return (
		<div
			{...props}
			className={`${ className } HomePage`}
		>
			<HomePageView
				url={url}
				onSubmit={handleSubmit}
				onUrlChange={e => setUrl( e.target.value )}
			/>
		</div>)
}


export interface HomePageViewProps extends HTMLAttributes<HTMLDivElement>
{
	onSubmit: FormEventHandler
	onUrlChange: ChangeEventHandler<HTMLInputElement>
	url: string
}


export function HomePageView( { onSubmit, onUrlChange, url, className = "", children, ...props }: HomePageViewProps )
{
	return (
		<div
			{...props}
			className={`${className} HomePageView flex flex-col justify-center min-h-screen container mx-auto px-4 text-center`}
		>
			<style>
				{`
					body {background: white;}
				`}
			</style>
			
			<header>
				<h1 className="text-5xl mb-4 text-dark font-bold">Stop resizing your window to<br/>check breakpoints</h1>
				<p className="text-xl mb-6 text-dark font-bold">...Just check them all at once</p>
			</header>
			
			
			<form
				onSubmit={onSubmit}
				className="relative mb-4 mx-auto"
				style={{
					width:    "520px",
					maxWidth: "100%",
				}}
			>
				<Checkpoint
					active={!url.length}
					className="rounded-lg"
				>
					<HeroInput
						type="text"
						value={url}
						autoFocus
						onChange={onUrlChange}
						placeholder="https://my-website.com"
					>
						Enter the url of the website you want to view
					</HeroInput>
				</Checkpoint>
				
				<button
					type="submit"
					className="absolute pin-r pin-t h-full bg-transparent px-4 border-0 text-4xl"
					disabled={!url}
				>
					<i aria-hidden="true">
						{url ?
						 "👌" :
						 "👈"}
					</i>
					<span className="sr-only">Show the repsonsive views for this website</span>
				</button>
			</form>
			
			<p className="text-sm text-grey">
				Or try one of those:&nbsp;
				<a
					className="underline"
					style={{ color: "inherit" }}
					href="https://developers.google.com/web/"
				>
					developers.google.com/web/
				</a>
			</p>
		</div>)
}



export interface HeroInputProps extends InputHTMLAttributes<HTMLInputElement>
{
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
}


export function HeroInput( { style = {}, className = "", children, ...props }: HeroInputProps )
{
	
	return (
		<label className="m-0 block ">
			{children && <span className="sr-only">{children}</span>}
			<input
				{...props}
				style={{
					...style,
					height: "64px",
				}}
				className={`${className} LargeInput m-0 px-4 text-3xl border-2 shadow-none rounded-lg w-full outline-none focus:border-teal`}
			/>
		</label>)
}
