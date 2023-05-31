import React from 'react'

const CreateButton = ({image, creating }) => {
  return (
       <>
         {image ? (
            <input type="submit" value="Create"></input>
          ) : (
            <div>
              <input
                type="submit"
                value={creating ? "Creating Art..." : "Create"}
              ></input>
              {/* <input onSubmit={clearHandler}
            type="submit"
            value={"Clear"}
          ></input> */}
            </div>
          )}
          </>
  )
}

export default CreateButton