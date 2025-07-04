import Home from "../pages/Home"

const publiRoute = {
  path: "/",
  children: [
    {
      index: true,
      element: <Home />,
    },
  ],
}

export default publiRoute
