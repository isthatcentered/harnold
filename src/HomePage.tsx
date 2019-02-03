import { RouteComponentProps } from "@reach/router"
import * as React from "react"
import { ChangeEventHandler, FormEvent, HTMLAttributes, InputHTMLAttributes, useState } from "react"
import "./homePage.scss"




export interface WaveProps extends HTMLAttributes<HTMLDivElement>
{
	active: boolean
}


export function Checkpoint( { active, style = {}, className = "", children, ...props }: WaveProps )
{
	
	return (
		<div
			{...props}
			style={{ ...style }}
			className={`${className} Checkpoint ${active ?
			                                      "active" :
			                                      ""}`}
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
			className={`${ className } HomePage text-center d-flex flex-column justify-content-center`}
			style={{
				minHeight: "100vh",
			}}
		>
			
			<style>
				{`
					body {background: white;}
				`}
			</style>
			<header>
				<h1 className="_fz-9 mb-4 text-dark font-weight-bold">Stop resizing your window to<br/>check breakpoints</h1>
				<p className="_fz-5 mb-6 text-dark font-weight-bold">...Just check them all at once</p>
			</header>
			
			
			<form
				onSubmit={handleSubmit}
				className="position-relative mb-4 mx-auto"
				style={{
					width:    "520px",
					maxWidth: "100%",
				}}
			>
				<Checkpoint active={!url.length}
				            style={{ borderRadius: "5px" }}>
					
					<LargeInput
						type="text"
						value={url}
						autoFocus
						onChange={e => setUrl( e.target.value )}
						placeholder="https://my-website.com"
					>
						Enter the url of the website you want to view
					</LargeInput>
				</Checkpoint>
				
				<button
					type="submit"
					className="position-absolute h-100 _pin-top _pin-right bg-transparent px-4 border-0 _fz-8"
					style={{}}
					disabled={!url}
				>
					<i aria-hidden="true">{url ?
					                       "👌" :
					                       "👈"}</i>
					<span className="sr-only">Show the repsonsive views of this website</span>
				</button>
			</form>
			
			<p className="_fz-2">Or try one of those: <a className="text-reset _underline"
			                                             href="https://developers.google.com/web/">developers.google.com/web/</a></p>
		</div>
	)
}


export interface LargeInputProps extends InputHTMLAttributes<HTMLInputElement>
{
	value: string
	onChange: ChangeEventHandler<HTMLInputElement>
}


export function LargeInput( { style = {}, className = "", children, ...props }: LargeInputProps )
{
	
	return (
		<label className="m-0 d-block ">
			{children && <span className="sr-only">{children}</span>}
			<input
				{...props}
				style={{
					...style,
					boxShadow:   "none",
					height:      "64px",
					borderWidth: "2px",
				}}
				className={`${className} LargeInput form-control form-control-lg m-0 _fz-7 `}
			/>
		</label>)
}
