
export default function AdminBox({
  children,
}: {
  children: React.ReactElement
}) {
  const styles: { [key: string]: React.CSSProperties } = {
    box: {
      width: '100%',
      // maxWidth: '1152px',
    }
  }
  return (
    <div style={styles.box}>
      {children}
    </div>
  )
}