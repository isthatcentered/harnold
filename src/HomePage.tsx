import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import { ChangeEventHandler, FormEvent, HTMLAttributes, InputHTMLAttributes, useState } from "react"
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
			className={`${className} Checkpoint ${stateClasses.join(" ")} `}
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
		
		navigate!( `/playground?url=${ url }` )
	}
	
	
	return (
		<div
			{...props}
			className={`${ className } HomePage text-center d-flex flex-column justify-content-center min-h-screen`}
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
				onSubmit={handleSubmit}
				className="position-relative mb-4 mx-auto"
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
						onChange={e => setUrl( e.target.value )}
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
					<i aria-hidden="true">{url ?
					                       "👌" :
					                       "👈"}</i>
					<span className="sr-only">Show the repsonsive views of this website</span>
				</button>
			</form>
			
			<p className="text-sm">Or try one of those: <a className="text-reset underline"
			                                               href="https://developers.google.com/web/">developers.google.com/web/</a></p>
		</div>
	)
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
