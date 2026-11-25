'use client'
import Report from "../components/report/Report";
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(
  () => import('@react-pdf/renderer').then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Carregando PDF...</p>,
  }
);

export default function Page() {
    return (  <PDFViewer style={{width: '100%', height: '100vh'}}>
    <Report />
  </PDFViewer>)
}