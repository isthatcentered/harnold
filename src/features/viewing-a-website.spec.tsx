import { default as React, ReactElement } from "react"
import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import { parse } from "query-string"
import App from "../App"




describe( `Displays playground`, () => {
	test( `Works`, () => {
		const { wrapper } = routerMount( "/playground", <App/> )
		expect( wrapper ).toHaveText( /playground/i )
	} )
} )


function routerMount( url: string, Component: ReactElement<any> ): {
	wrapper: ReactWrapper<LocationProviderProps>,
	query: Partial<{ [ key: string ]: string }>,
	path: string,
	navigate: jest.Mock
}
{
	const [ path, query ] = url.split( "?" ),
	      navigate        = jest.fn()
	
	const history: History = {
		...createHistory( createMemorySource( url ) ),
		navigate,
	}
	
	history.location.search = query
	
	let wrapper: ReactWrapper<LocationProviderProps> = mount(
		<LocationProvider history={history}>
			{Component}
		</LocationProvider> )
	
	return {
		wrapper,
		path,
		query: parse( query ) as any,
		navigate,
	}
}


/*
function makeApp( { url, navigate = jest.fn() }: { url: string } & Partial<History> ): void
{
	const [ path, search ] = url.split( "?" )
	
	const history: History = {
		...createHistory( createMemorySource( url ) ),
		navigate: navigate,
	}
	
	history.location.search = search
	
	WRAPPER = mount(
		<LocationProvider history={history}>
			<Root/>
		</LocationProvider> )
	
	PROPS = WRAPPER.props()
}
*/