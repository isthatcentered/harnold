import * as React from "react"
import { IframeHTMLAttributes } from "react"




export interface ScalableIframeProps extends IframeHTMLAttributes<HTMLIFrameElement>
{
	scale: number
	width: number
	height: number
	src: string
}


export const ScalableIframe = ( { scale = 1, width, height, ...props }: ScalableIframeProps ) => {
	if ( scale > 2 || scale < 0 )
		throw new Error( `ScalableIframe expects a value between 0 and 2` )
	
	const scaledWidth  = width * scale,
	      scaledHeight = height * scale
	
	return (
		<div
			className="ScalableIframe"
			style={{
				width:           scaledWidth,
				height:          scaledHeight,
				transform:       `scale(${ scale })`,
				transformOrigin: `top left`,
			}}
		>
			<iframe
				sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
				{...props}
				width={width}
				height={height}
			/>
		</div>
	)
}

export class ScalableIFrameInteractor
{
	static selector: string = `ScalableIframe`
	private _iframe = (this._component.getElementsByTagName( "iframe" )[ 0 ] as HTMLIFrameElement)
	
	
	constructor( private _component: HTMLElement )
	{
	}
	
	
	get width(): number
	{
		return parseFloat( this._iframe.width )
	}
	
	
	get height(): number
	{
		return parseFloat( this._iframe.height )
	}
	
	
	private get scale(): number
	{
		const scale = this._component.style.transform
		
		if ( !scale )
			throw new Error( `No scale attribute on this device. Has the scale element changed or something ?` )
		
		return parseFloat( scale.match( /\((.*?)\)/ )![ 1 ] )
	}
	
	
	get url(): string
	{
		return this._iframe.src
	}
	
	
	get iframe(): HTMLIFrameElement
	{
		return this._iframe
	}

	isAtScale( scale: number )
	{
		const scaledWidth  = this.width * scale,
		      scaledHeight = this.height * scale
		
		const scalerWidth  = parseFloat( this._component.style.width! ),
		      scalerHeight = parseFloat( this._component.style.height! )
		
		const takesScaledWidth   = scalerWidth === scaledWidth,
		      takesScaledHeight  = scalerHeight === scaledHeight,
		      hasCorrectCssScale = this.scale === scale
		
		return takesScaledWidth && takesScaledHeight && hasCorrectCssScale
	}
}