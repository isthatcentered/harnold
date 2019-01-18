import { default as React, IframeHTMLAttributes, ReactElement } from "react"
import { createHistory, createMemorySource, History, LocationProvider, LocationProviderProps } from "@reach/router"
import { mount, ReactWrapper } from "enzyme"
import { parse } from "query-string"
import { tick } from "@isthatcentered/tickable"
import { App, AppProps } from "../App"
import { device, makeDevice } from "../contracts"
import { pack } from "@isthatcentered/charlies-factory"




const makeApp = makeMakeRoutableComponent<AppProps>( App, {
		devices: pack( 3, () => makeDevice() ),
	},
)


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
