import * as React from "react"
import { ReactElement } from "react"
import { fireEvent, render } from "react-testing-library"
import { HomePage } from "./HomePage"




function customRender( component: ReactElement<any> )
{
	const navigate                                 = jest.fn(),
	      { container, getByLabelText, getByText } = render( <HomePage navigate={navigate}/> ),
	      submitButton                             = getByText( /Show the repsonsive views for this website/i ).parentElement!,
	      urlInput                                 = getByLabelText( /url of the website you want to view/i ),
	      checkpoint                               = container.getElementsByClassName( "Checkpoint" )[ 0 ]
	
	const enterUrl  = ( value: string ) => fireEvent.change( urlInput, { target: { value } } ),
	      submitUrl = () => fireEvent.submit( urlInput )
	
	if ( !checkpoint )
		throw new Error( `No <Checkpoint/> component in dom` )
	
	
	return {
		getByText,
		getByLabelText,
		submitButton,
		urlInput,
		enterUrl,
		submitUrl,
		checkpoint,
		navigate,
	}
}


describe( `HomePage`, () => {
	describe( `Url form`, () => {
		describe( `Empty`, () => {
			test( `Input is focused on page load`, () => {
				const { urlInput, submitButton } = customRender( <HomePage/> )
				
				expect( document.activeElement ).toBe( urlInput )
			} )
			
			test( `Submit button disabled`, () => {
				const { submitButton } = customRender( <HomePage/> )
				
				expect( (submitButton as HTMLButtonElement).disabled ).toBe( true )
			} )
			
			test( `Displays as a checkpoint`, () => {
				const { checkpoint } = customRender( <HomePage/> )
				
				expect( checkpoint.classList ).toContain( "active" )
			} )
		} )
		
		describe( `Has value`, () => {
			test( `Submit button is enabled`, () => {
				const { submitButton, enterUrl } = customRender( <HomePage/> )
				
				enterUrl( "something" )
				
				expect( (submitButton as HTMLButtonElement).disabled ).toBe( false )
			} )
			
			test( `Checkpoint is disabled `, () => {
				const { enterUrl, checkpoint } = customRender( <HomePage/> )
				
				enterUrl( "something" )
				
				expect( checkpoint.classList ).not.toContain( "active" )
			} )
		} )
	} )
	
	describe( `Submitting`, () => {
		test( `Doesn't redirect if no url entered`, () => {
			const { submitButton, submitUrl, navigate } = customRender( <HomePage/> )
			
			submitUrl()
			
			expect( navigate ).not.toHaveBeenCalled()
		} )
		
		test( `Redirects to playground page with url as query param`, () => {
			const { submitUrl, navigate, enterUrl } = customRender( <HomePage/> ),
			      url                               = "entered-url"
			
			enterUrl( url )
			
			submitUrl()
			
			expect( navigate ).toHaveBeenCalledWith( `/playground?url=${url}` )
		} )
		
		test( `Url is normalized if value entered`, () => {
			const { submitUrl, enterUrl, navigate } = customRender( <HomePage/> ),
			      url                               = "entered-url"
			
			enterUrl( url )
			
			submitUrl()
			
			expect( navigate ).toHaveBeenCalledWith( `/playground?url=http://${url}` )
			
		} )
	} )
} )