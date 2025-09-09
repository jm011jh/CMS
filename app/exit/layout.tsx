// import DefaultLayout from '../../components/layout/DefaultLayout'

export default function Layout({
    children,
  }: {
    children: React.ReactElement
  }){
    return (
        // <DefaultLayout>

          <div className="public-wrap">
            {children}
          </div>

        // </DefaultLayout>
    )
}