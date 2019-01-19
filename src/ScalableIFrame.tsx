import { IframeHTMLAttributes } from "react"
import * as React from "react"



export interface ScalableIframeProps extends IframeHTMLAttributes<HTMLIFrameElement>
{
	scale: number
	width: number
	height: number
	src: string
}


export function ScalableIframe( { scale = 1, width, height, ...props }: ScalableIframeProps )
{
	const scaledWidth  = width * scale,
	      scaledHeight = height * scale
	
	return (
		<div
			className="ScalableIframe"
			style={{
				width:           scaledWidth,
				height:          scaledHeight,
				transform:       `scale(${scale})`,
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