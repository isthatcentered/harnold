import { ComponentClass, default as React, IframeHTMLAttributes, InputHTMLAttributes, ReactElement, StatelessComponent } from "react"
import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { EnzymePropSelector, mount, ReactWrapper } from "enzyme"
import { parse } from "query-string"
import { tick } from "@isthatcentered/tickable"
import { App, AppProps } from "../App"
import { device, makeDevice } from "../contracts"
import { pack } from "@isthatcentered/charlies-factory"
import { ScalableIframe } from "../ScalableIFrame"




const makeApp = makeMakeRoutableComponent<AppProps>( App, {
		devices: pack( 3, () => makeDevice() ),
	},
)

describe( `Specifying a website to view`, () => {
	test( `No sumbmit on empty`, () => {
		const { wrapper, navigate } = makeApp( "/" )
		
		const input = fill( /url of the website to display/i, "", wrapper )
		
		submit( input )
		
		expect( navigate ).not.toHaveBeenCalled()
	} )
	
	test( `Redirected successfully to playground page`, () => {
		// const { wrapper, navigate } = makeApp( "/" )
		//
		// const input = fill( /url of the website to display/i, "SOME_WEBSITE.com", wrapper )
		//
		// submit( input )
		//
		// expect( navigate ).toHaveBeenCalledWith( "/playground?url=SOME_WEBSITE.com" )
	} )
} )

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
		
		expectPageToContainDevicesMatching( devices, wrapper )
		
		expect.hasAssertions()
	} )
	
	test( `Each device is set to display the website`, async () => {
		const { wrapper, navigate, query } = makeApp( "/playground?url=URL_FROM_QUERY.com" )
		
		await tick()
		
		expectDisplayedDevicesToHaveSource( query.url!, wrapper )
		
		expect.hasAssertions()
	} )
} )

describe( `Scaling the view`, () => {
	test( `Modifying the "view scale" scales the devices`, async () => {
		const { wrapper, navigate, query } = makeApp( "/playground?url=URL_FROM_QUERY.com" ),
		      newScale: number             = .4
		
		await tick()
		
		change( /scale the devices up or down/i, newScale, wrapper )
		
		expectDisplayedDevicesToBeAtScale( newScale, wrapper )
		
		expect.hasAssertions()
	} )
	
	test( `View scale is backed up on refresh`, () => {
		const oldScale: number = .3,
		      newScale: number = .7,
		      storingKey       = "harnold:playground:scale"
		
		window.localStorage.setItem( storingKey, oldScale.toString() )
		
		const { wrapper, navigate, query } = makeApp( "/playground?url=URL_FROM_QUERY.com" )
		
		expectDisplayedDevicesToBeAtScale( oldScale, wrapper )
		
		change( /scale the devices up or down/i, newScale, wrapper )
		
		expect( window.localStorage.getItem( storingKey ) ).toBe( newScale.toString() )
	} )
} )


function makeMakeRoutableComponent<Props>( Component: Function, defaultProps: Props ): ( url: string, props?: Partial<Props> ) => Props & RouterMountProps
{
	return ( url: string, props: Partial<Props> = {} ) => {
		
		const _props: Props = {
			...defaultProps,
			...props,
		}
		
		return {
			..._props,
			... routerMount( url, <Component {..._props}/> ),
		}
	}
}


function change( element: RegExp, value: any, wrapper: ReactWrapper<any> ): ReactWrapper<InputHTMLAttributes<HTMLInputElement>>
{
	const match = wrapper
		.find( "input" )
		.filterWhere( node => (node.closest( "label" ).text() || "").match( element ) !== null )
	
	if ( !match.exists() )
		throw new Error( `☺️ Sorry, found no input identifiable via text ${element}` )
	
	if ( typeof match.props().onChange !== "function" )
		throw new Error( `You provided no "onChange" prop for input ${element}. I think you might want to though 🙄` )
	
	match.simulate( "change", { target: { value } } )
	
	return match
}


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


function expectDisplayedDevicesToHaveSource( source: string, wrapper: ReactWrapper<any> )
{
	getDevices( wrapper ).forEach( device =>
		expect( device.props().src ).toBe( source ) )
}


function expectPageToContainDevicesMatching( devices: device[], wrapper: ReactWrapper<any> )
{
	devices.forEach( device => {
		const match = findDeviceMatching( device, wrapper )
		
		expect( match.exists() ).toBe( true )
		
		expect( wrapper ).toHaveText( device.label )
	} )
}


function expectDisplayedDevicesToBeAtScale( scale: number, wrapper: ReactWrapper<any> )
{
	const devices = getDevices( wrapper )
	
	devices.forEach( device => {
			const scalerComponent = device.closest( ScalableIframe )
			
			expect( scalerComponent.exists() ).toBe( true )
			
			expect( scalerComponent.props().scale ).toBe( scale )
		},
	)
	
	expect.hasAssertions()
}


function getDevices( wrapper: ReactWrapper<any> ): ReactWrapper<IframeHTMLAttributes<HTMLIFrameElement>>
{
	const devices = wrapper
		.find( "iframe" )
	
	if ( !devices.exists() )
		throw new Error( `☺️ Sorry, I found no <iframe> in the dom` )
	
	return devices
}


function findDeviceMatching( device: device, wrapper: ReactWrapper<any> ): ReactWrapper<IframeHTMLAttributes<HTMLIFrameElement>>
{
	const match = getDevices( wrapper )
		.filterWhere( node => {
			const { width, height } = node.props()
			return device.height === height && device.width === width
		} )
	
	if ( !match.exists() )
		throw new Error( `☺️ Couldn't find any device matching "{width: ${device.width}, height: ${device.height}, label: ${device.label} }" in dom` )
	
	return match
}



export type findable<P> = ComponentClass<P> | StatelessComponent<P> | EnzymePropSelector | string


export function getByText<P>( text: RegExp, component: findable<P>, wrapper: ReactWrapper<any> ): ReactWrapper<P | any>
{
	return wrapper
		.find( component as any )
		.filterWhere( node => node.text().match( text ) !== null )
}


export function fill( target: RegExp, value: any, wrapper: ReactWrapper<any> ): ReactWrapper<InputHTMLAttributes<HTMLInputElement>>
{
	
	const match = getByText( target, "label", wrapper )
		.find( "input" )
	
	if ( !match.exists() )
		throw new Error( `☺️ Couldn't find any input identifyable by ${target.toString()}` )
	
	return match
}


function submit( target: ReactWrapper<any> ): void
{
	const form = target.closest( "form" )
	
	if ( !form.exists() )
		throw new Error( `☺️ Couldn't find any form wrapping${target.name()}` )
	
	if ( typeof form.props().onSubmit !== "function" )
		throw new Error( `You provided no "onSubmit" prop for the form you are trying to submit. I think you probably meant to though 🙄` )
	
	form.simulate( "submit" )
}