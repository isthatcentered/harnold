import * as React from "react"
import { HomePage } from "./HomePage"
import { customRender } from "./features/viewing-a-website.spec"




function renderHome()
{
	const navigate                                               = jest.fn(),
	      { container, getByLabelText, getByText, submit, fill } = customRender( <HomePage navigate={navigate}/> ),
	      submitButton                                           = getByText( /Show the repsonsive views for this website/i ).parentElement!,
	      urlInput                                               = getByLabelText( /url of the website you want to view/i ),
	      checkpoint                                             = container.getElementsByClassName( "Checkpoint" )[ 0 ]
	
	const typeUrl   = ( value: string ) => fill( /url of the website you want to view/i, value ),
	      submitUrl = () => submit( /url of the website you want to view/i )
	
	if ( !checkpoint )
		throw new Error( `No <Checkpoint/> component in dom` )
	
	
	return {
		submitButton,
		urlInput,
		checkpoint,
		navigate,
		typeUrl,
		submitUrl,
	}
}


describe( `HomePage`, () => {
	describe( `Url form`, () => {
		describe( `Empty`, () => {
			test( `Input is focused on page load`, () => {
				const { urlInput } = renderHome()
				
				expect( document.activeElement ).toBe( urlInput )
			} )
			
			test( `Submit button disabled`, () => {
				const { submitButton } = renderHome()
				
				expect( (submitButton as HTMLButtonElement).disabled ).toBe( true )
			} )
			
			test( `Displays as a checkpoint`, () => {
				const { checkpoint } = renderHome()
				
				expect( checkpoint.classList ).toContain( "active" )
			} )
		} )
		
		describe( `Has value`, () => {
			test( `Submit button is enabled`, () => {
				const { submitButton, typeUrl } = renderHome()
				
				typeUrl( "something" )
				
				expect( (submitButton as HTMLButtonElement).disabled ).toBe( false )
			} )
			
			test( `Checkpoint is disabled `, () => {
				const { typeUrl, checkpoint } = renderHome()
				
				typeUrl( "something" )
				
				expect( checkpoint.classList ).not.toContain( "active" )
			} )
		} )
	} )
	
	describe( `Submitting`, () => {
		test( `Doesn't redirect if no url entered`, () => {
			const { submitUrl, navigate } = renderHome()
			
			submitUrl()
			
			expect( navigate ).not.toHaveBeenCalled()
		} )
		
		test( `Redirects to playground page with url as query param`, () => {
			const { submitUrl, navigate, typeUrl } = renderHome(),
			      url                              = "http://entered-url"
			
			typeUrl( url )
			
			submitUrl()
			
			expect( navigate ).toHaveBeenCalledWith( `/playground?url=${url}` )
		} )
		
		test( `Url is normalized`, () => {
			const { submitUrl, typeUrl, navigate } = renderHome(),
			      url                              = "entered-url"
			
			typeUrl( url )
			
			submitUrl()
			
			expect( navigate ).toHaveBeenCalledWith( `/playground?url=${"http://" + url}` )
		} )
	} )
} )