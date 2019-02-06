import { ViewScaler } from "./ViewScaler"
import * as React from "react"
import { customRender } from "./features/viewing-a-website.spec"




describe( `<ViewScaler/>`, () => {
	describe( `Throws if passed value is not a css transform:scale compatible value`, () => {
		;[ -1, 3 ].forEach( scale =>
			test( `Throws for value ${scale}`, () => {
				expect( () => customRender(
					<ViewScaler
						onScale={jest.fn()}
						value={10}
					/> ) ).toThrow( /ViewScaler expects a value between 0 and 2/i )
			} ),
		)
	} )
} )