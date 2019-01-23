import * as React from "react"
import { mount } from "enzyme"
import { Timeout } from "./Timeout"




describe( `<Timeout/>`, () => {
	;[
		1000,
		1500,
		2000,
	].forEach( duration =>
		test( `Passes true after specified duration`, () => {
			jest.useFakeTimers()
			
			const spy     = jest.fn(),
			      wrapper = mount(
				      <Timeout duration={duration}>
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
		
		const spy     = jest.fn(),
		      wrapper = mount(
			      <Timeout duration={2000}>
				      {done => {
					      spy( done )
					      return null
				      }}
			      </Timeout> )
		
		expect( spy ).toHaveBeenCalledWith( false )
		
		wrapper.unmount()
		
		jest.runAllTimers()
		
		expect( spy ).toHaveBeenCalledTimes( 1 )
	} )
} )