import * as React from "react"
import { customRender } from "./viewing-a-website.spec"
import { PlaygroundPage } from "../PlaygroundPage"
import { makeDevice } from "../contracts"
import { HistoryLocation } from "@reach/router"




function renderPlaygroundPage( { query }: { query: string } )
{
	const navigate = jest.fn(),
	      utils    = customRender(
		      <PlaygroundPage
			      location={{ search: query } as HistoryLocation}
			      navigate={navigate}
			      devices={[ makeDevice(), makeDevice() ]}
		      /> )
	
	return {
		...utils,
		navigate,
		query,
	}
}


describe( `PlaygroundPage (controller)`, () => {
	test( `Redirects to home if no "url" query param`, () => {
		const { navigate } = renderPlaygroundPage( { query: "" } )
		
		expect( navigate ).toHaveBeenCalledWith( "/" )
	} )
	
	test( `Doesn't redirect if "url" query param provided`, () => {
		const { navigate } = renderPlaygroundPage( { query: "?url=url-query-param-value" } )
		
		expect( navigate ).not.toHaveBeenCalled()
	} )
} )
