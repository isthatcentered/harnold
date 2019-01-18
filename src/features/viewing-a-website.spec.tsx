import { default as React, IframeHTMLAttributes, ReactElement } from "react"
import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import { parse } from "query-string"
import App from "../App"
import { tick } from "@isthatcentered/tickable"




describe( `No website given in query`, () => {
	test( `User is redirected to home`, async () => {
		const { wrapper, navigate } = routerMount( "/playground?__EMPTY__", <App/> )
		
		await tick()
		
		expect( navigate ).toHaveBeenCalledWith( "/", undefined )
	} )
} )


describe( `"url" given in query`, () => {
	test( `User is not redirected`, async () => {
		const { wrapper, navigate } = routerMount( "/playground?url=SOME_URL.COM", <App/> )
		
		await tick()
		
		expect( navigate ).not.toHaveBeenCalled()
	} )
	
	test( `Each device is set to display the website`, async () => {
		const { wrapper, navigate, query } = routerMount( "/playground?url=URL_FROM_QUERY.com", <App/> )
		
		await tick()
		
		getDisplayedDevices( wrapper )
			.forEach( props => expect( props.src ).toBe( query.url ) )
		
		expect.hasAssertions()
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


function getDisplayedDevices( wrapper: ReactWrapper<LocationProviderProps> )
{
	const iframes = wrapper
		.find( "iframe" )
	
	if ( !iframes.exists() )
		throw new Error( `☺️ Sorry, I found no <iframe> in the dom` )
	
	return iframes
		.map( ( iframe: ReactWrapper<IframeHTMLAttributes<HTMLIFrameElement>> ) =>
			iframe.props() )
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