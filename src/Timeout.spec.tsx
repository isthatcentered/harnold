import * as React from "react"
import { Timeout } from "./Timeout"
import { customRender } from "./features/viewing-a-website.spec"




describe( `<Timeout/>`, () => {
	;[
		1000,
		1500,
		2000,
	].forEach( duration =>
		test( `Passes true after specified duration`, () => {
			jest.useFakeTimers()
			
			const spy = jest.fn()
			
			customRender( <Timeout duration={duration}>
				{done => {
					spy( done )
					return null
				}}
			</Timeout> )
			
			expect( spy ).toHaveBeenCalledWith( false )
			
			jest.advanceTimersByTime( duration )
			
			expect( spy ).toHaveBeenCalled()
		} ) )
	
	test( `Cancels timeout on unmount`, () => {
		jest.useFakeTimers()
		
		const spy         = jest.fn(),
		      { unmount } = customRender(
			      <Timeout duration={2000}>
				      {done => {
					      spy( done )
					      return null
				      }}
			      </Timeout> )
		
		expect( spy ).toHaveBeenCalledWith( false )
		
		unmount()
		
		jest.runAllTimers()
		
		expect( spy ).toHaveBeenCalledTimes( 1 )
	} )
} )