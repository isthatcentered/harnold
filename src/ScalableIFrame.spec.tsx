import * as React from "react"
import { CSSProperties, IframeHTMLAttributes } from "react"
import { shallow, ShallowWrapper } from "enzyme"




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


describe( `<ScalableIframe/>`, () => {
	
	;[
		{
			width:  345,
			height: 876,
			scale:  0.1, // .1 will be turned into 0.1 in css
		},
		{
			width:  345,
			height: 876,
			scale:  0.7,
		},
		{
			width:  345,
			height: 876,
			scale:  1.5,
		},
	].forEach( spec => {
		let wrapper: ShallowWrapper<ScalableIframeProps>,
		    wrapperStyles: CSSProperties
		
		beforeEach( () => {
			wrapper = shallow( <ScalableIframe {...spec} src=""/> )
			wrapperStyles = wrapper.props().style!
		} )
		
		test( `Passes desired width and height to iframe element`, () => {
			const iframe = wrapper.find( "iframe" ).props()
			
			expect( iframe.width ).toBe( spec.width )
			
			expect( iframe.height ).toBe( spec.height )
		} )
		
		test( `Visually resizes the iframe`, () => {
			expect( wrapperStyles.transform ).toBe( `scale(${spec.scale})` )
		} )
		
		test( `Ensures the iframe takes the scaled down/up size in dom`, () => {
			const scaleWidth   = spec.width * spec.scale,
			      scaledHeight = spec.height * spec.scale
			
			expect( wrapperStyles.width ).toBe( scaleWidth )
			
			expect( wrapperStyles.height ).toBe( scaledHeight )
		} )
	} )
} )

