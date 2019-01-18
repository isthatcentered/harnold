import { default as React, IframeHTMLAttributes, ReactElement } from "react"
import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import { parse } from "query-string"
import { tick } from "@isthatcentered/tickable"
import { App, AppProps } from "../App"
import { device, makeDevice } from "../contracts"
import { pack } from "@isthatcentered/charlies-factory"




describe( `No website given in query`, () => {
	test( `User is redirected to home`, async () => {
		const { wrapper, navigate } = makeApp( "/playground?__EMPTY__" )
		
		await tick()
		
		expect( navigate ).toHaveBeenCalledWith( "/", undefined )
	} )
} )


describe( `"url" given in query`, () => {
	test( `User is not redirected`, async () => {
		const { wrapper, navigate } = makeApp( "/playground?url=SOME_URL.COM" )
		
		await tick()
		
		expect( navigate ).not.toHaveBeenCalled()
	} )
	
	test( `Displays a device for each given default device`, async () => {
		const devices: device[]     = pack( 4, () => makeDevice() ),
		      { wrapper, navigate } = makeApp( "/playground?url=SOME_URL.COM", { devices } )
		
		await tick()
		
		devices.forEach( device => {
			const match = wrapper
				.find( "iframe" )
				.filterWhere( ( node: ReactWrapper<IframeHTMLAttributes<HTMLIFrameElement>> ) => {
					const { width, height } = node.props()
					return device.height === height && device.width === width
				} )
			
			expect( match.length ).toBe( 1 )
			expect( wrapper ).toHaveText( device.label )
		} )
		
		
		expect.hasAssertions()
	} )
	
	test( `Each device is set to display the website`, async () => {
		const { wrapper, navigate, query } = makeApp( "/playground?url=URL_FROM_QUERY.com" )
		
		await tick()
		
		getDisplayedDevices( wrapper )
			.forEach( props => expect( props.src ).toBe( query.url ) )
		
		expect.hasAssertions()
	} )
} )



function makeApp( url: string, props: Partial<AppProps> = {} ): AppProps & RouterMountProps
{
	const _props: AppProps = {
		devices: pack( 4, () => makeDevice() ),
		...props,
	}
	
	return {
		..._props,
		...routerMount( url, <App {..._props}/> ),
	}
} // @todo: makeRoutableComponent<T>(component): (url: string, props: T) => RW<T>


export interface RouterMountProps
{
	wrapper: ReactWrapper<LocationProviderProps>,
	query: Partial<{ [ key: string ]: string }>,
	path: string,
	navigate: jest.Mock
}


export function routerMount( url: string, Component: ReactElement<any> ): RouterMountProps
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