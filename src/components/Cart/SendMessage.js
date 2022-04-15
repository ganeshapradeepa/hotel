import React, { Component } from "react";
// Getting local JSON file
import cartCtx from "./Footer";

export class Example2 extends Component {
 
    render() {
      console.log(Example2)
        return (
            <>
                <div>
                    <table border="2">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>price</th>
                            </tr>
                            // Mapping array of objects
                            {cartCtx.cartCtx.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

export default Example2;