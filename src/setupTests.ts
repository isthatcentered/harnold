import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { cleanup } from "react-testing-library"




configure( { adapter: new Adapter() } )

setGlobals()

afterEach( cleanup )


function setGlobals()
{
	window.fetch = jest.fn()
	window.scrollTo = jest.fn()
}