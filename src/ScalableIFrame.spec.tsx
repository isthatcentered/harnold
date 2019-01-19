import * as React from "react"
import { CSSProperties } from "react"
import { shallow, ShallowWrapper } from "enzyme"
import { ScalableIframe, ScalableIframeProps } from "./ScalableIFrame"




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
		
		describe( `Given {width: ${spec.width} height: ${spec.height} scale: ${spec.scale}}`, () => {
			
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
	
	describe( `Throws if passed value is not a css transform:scale compatible value`, () => {
		;[
			-1, 3,
		]
			.forEach( scale =>
				test( `Throws for value ${scale}`, () => {
					expect( () => shallow(
						<ScalableIframe
							scale={scale}
							width={0}
							height={0}
							src=""
						/> ) )
						.toThrow( /ScalableIframe expects a value between 0 and 2/i )
				} ) )
	} )
} )

