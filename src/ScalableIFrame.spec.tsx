import * as React from "react"
import { ScalableIframe, ScalableIFrameInteractor } from "./ScalableIFrame"
import { customRender } from "./features/viewing-a-website.spec"




describe( `<ScalableIframe/>`, () => {
	
	;[
		{
			width:  345,
			height: 876,
			scale:  0.1,
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
		let wrapper: ScalableIFrameInteractor
		
		beforeEach( () => {
			wrapper = new ScalableIFrameInteractor( customRender( <ScalableIframe {...spec} src=""/> ).wrapper as HTMLElement )
		} )
		
		describe( `Given {width: ${spec.width} height: ${spec.height} scale: ${spec.scale}}`, () => {
			test( `Passes desired width and height to iframe element`, () => {
				expect( wrapper.width ).toBe( spec.width )
				
				expect( wrapper.height ).toBe( spec.height )
			} )
			
			test( `Ensures the scaled iframe takes only the scaled width & height in the dom`, () => {
				expect( wrapper.isAtScale( spec.scale ) ).toBe( true )
			} )
		} )
	} )
	
	describe( `Throws if passed value is not a css transform:scale compatible value`, () => {
		;[
			-1,
			3,
		]
			.forEach( scale =>
				test( `Throws for value ${scale}`, () => {
					expect( () => customRender(
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

