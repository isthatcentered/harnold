import { configure, ReactWrapper } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import chalk from "chalk"




configure( { adapter: new Adapter() } )

setGlobals()


declare global
{
	namespace jest
	{
		interface Matchers<R>
		{
			toHaveText( value: string | RegExp ): CustomMatcherResult
		}
	}
}

const printDebug = ( wrapper: ReactWrapper<any> ) => chalk`
👉	{black Debug(}
{gray ${wrapper.debug()} }
	)`


expect.extend( {
	toHaveText( wrapper: ReactWrapper<any>, expected: string )
	{
		const text = wrapper.text()
		
		const pass = text.search( new RegExp( expected, "i" ) ) > -1
		
		if ( pass ) {
			return { // expect.not.to... case
				message: () => chalk`
👉	{black Expected(}
	
     ${this.utils.printReceived( text.toLowerCase() )}
	
	).not.toHaveText( ${this.utils.printExpected( expected.toString().toLowerCase() )} )



${printDebug( wrapper )}
				`,
				pass,
			}
		} else {
			return {
				message: () => chalk`
👉	{black Expected(}
	
     ${this.utils.printReceived( text.toLowerCase() )}
	
	).toHaveText( ${this.utils.printExpected( expected.toString().toLowerCase() )} )


${printDebug( wrapper )}

`,
				pass,
			}
		}
	},
} )


function setGlobals()
{
	window.fetch = jest.fn()
}