import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CLink,
  CRow,
} from '@coreui/react'
import DataTable from 'react-data-table-component'
import { string } from 'prop-types'
import styled from 'styled-components'
import ExcelJS from 'exceljs'
import Workbook from 'exceljs'
const ChurchTable = () => {
  const [church, setChurch] = useState([])
  const [search, setSearch] = useState('')
  const [filteredChurches, setFilteredChurches] = useState([])
  const data = [
    {
      id: 0,
      name: 'GoodNews',
      description: 'Guest',
      address1: 'North Kierland',
      address2: 'Church road',
      email: 'gn@gmail.com',
      city: 'Scottsdale',
      stateId: 'AZ',
      zipcode: '85254',
      mobile: '342-319-8386',
      url: 'http://goodnews.church/',
    },
    {
      id: 1,
      name: 'Yourdestiny',
      description: 'Guest',
      address1: 'Avocado Ave',
      address2: 'Church road',
      email: 'Yd@gmail.com',
      city: 'NewPort Beach',
      stateId: 'CA',
      zipcode: '92660',
      mobile: '863-423-1983',
      url: 'https://www.yourdestiny.church/',
    },
    {
      id: 2,
      name: 'Gracesterling',
      description: 'Guest',
      address1: 'Buena Vista',
      address2: 'Church road',
      email: 'gs@gmail.com',
      city: 'Lake Buena Vista',
      stateId: 'FL',
      zipcode: '32830',
      mobile: '423-198-3422',
      url: 'https://gracesterling.com/',
    },
    {
      id: 3,
      name: 'NewSpring',
      description: 'Guest',
      address1: 'Mauna Lani',
      address2: 'Church road',
      email: 'ns@gmail.com',
      city: 'Kohala coast',
      stateId: 'HI',
      zipcode: '96743',
      mobile: '231-983-0912',
      url: 'https://newspring.cc',
    },
    {
      id: 4,
      name: 'Go2cornerstone',
      description: 'Guest',
      address1: "Kukui'ula Village",
      address2: 'Church road',
      email: 'g2cs@gmail.com',
      city: 'Koloa',
      stateId: 'HI',
      zipcode: '96753',
      mobile: '983-032-5912',
      url: 'https://go2cornerstone.com/',
    },
    {
      id: 5,
      name: 'Saddleback',
      description: 'Guest',
      address1: 'Beach Walk',
      address2: 'Church road',
      email: 'sbc@gmail.com',
      city: 'Honolulu',
      stateId: 'HI',
      zipcode: '96815',
      mobile: '283-193-0912',
      url: 'https://saddleback.com/',
    },
    {
      id: 6,
      name: 'Celebration',
      description: 'Guest',
      address1: 'Waikoloa Beach',
      address2: 'Church road',
      email: 'cs@gmail.com',
      city: 'Wailkoloa',
      stateId: 'HI',
      zipcode: '96738',
      mobile: '198-323-0912',
      url: 'https://celebration.church/',
    },
    {
      id: 7,
      name: 'ChurchontheMove',
      description: 'Guest',
      address1: 'wailea Drive',
      address2: 'Church road',
      email: 'cotm@gmail.com',
      city: 'Kihei',
      stateId: 'HI',
      zipcode: '96753',
      mobile: '830-912-8201',
      url: 'https://churchonthemove.com/',
    },
    {
      id: 8,
      name: 'Seacoast',
      description: 'Guest',
      address1: 'Bellevue Square',
      address2: 'Church road',
      email: 'sc@gmail.com',
      city: 'Bellevue',
      stateId: 'WA',
      zipcode: '98004',
      mobile: '231-983-9102',
      url: 'https://www.seacoast.org/',
    },
    {
      id: 9,
      name: 'Gfcflorida',
      description: 'Guest',
      address1: 'Bellevue Square',
      address2: 'Church road',
      email: 'gf@gmail.com',
      city: 'Bellevue',
      stateId: 'WA',
      zipcode: '98004',
      mobile: '654-983-0912',
      url: 'https://gfcflorida.com/',
    },
    {
      id: 10,
      name: 'Crosspoint',
      description: 'Guest',
      address1: 'wailea Drive',
      address2: 'Church road',
      email: 'cc@gmail.com',
      city: 'Kihei',
      stateId: 'HI',
      zipcode: '96756',
      mobile: '319-823-0912',
      url: 'https://crosspointechurch.com/',
    },
  ]
  const customStyles = {
    headCells: {
      style: { background: 'black', color: 'white' },
    },
    rows: {
      style: { marginTop: '10px', width: '100%' },
    },
  }
  const column = [
    // {
    //   name: <strong>ChurchId</strong>,
    //   selector: (row) => row.id,
    //   sortable: true,
    // },
    {
      name: <strong>Name</strong>,
      selector: (row) => row.name,
      sortable: true,
    },
    // {
    //   name: <strong>Description</strong>,
    //   selector: (row) => row.description,
    // },
    // {
    //   name: <strong>Address</strong>,
    //   selector: (row) => row.address1,
    // },
    {
      name: <strong>City</strong>,
      selector: (row) => row.city,
    },
    // {
    //   name: <strong>State</strong>,
    //   selector: (row) => row.stateId,
    //   autoWidth: 'none',
    // },
    // {
    //   name: <strong>ZipCode</strong>,
    //   selector: (row) => row.zipcode,
    // },
    {
      name: <strong>Mobile</strong>,
      selector: (row) => row.mobile,
    },
    {
      name: <strong>Email</strong>,

      selector: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
    },

    {
      name: <strong>URL</strong>,
      selector: (row) => (
        <a href={row.url} target="_blank" rel="noreferrer">
          {row.url}
        </a>
      ),
    },
    {
      name: <strong>Action</strong>,
      cell: (row) => (
        <Link to="/forms/church-edit">
          <CButton>Edit</CButton>
        </Link>
      ),
    },
  ]
  useEffect(() => {
    setFilteredChurches(data)

    const result = data.filter((church) => {
      return church.name.toLowerCase().match(search.toLowerCase())
    })

    setFilteredChurches(result)
  }, [search])
  const exportData = () => {
    const fileName = 'simple.xlsx'
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('my sheet')
    sheet.columns = [
      //   { header: "id", key: "id", width: 10 },
      { header: 'name', key: 'name', with: 32 },
      { header: 'description', key: 'description', width: 32 },
      { header: 'address1', key: 'address1', width: 32 },
      { header: 'city', key: 'city', width: 32 },
      { header: 'state', key: 'stateId', width: 32 },
      { header: 'zipcode', key: 'zipcode', width: 32 },
      { header: 'mobile', key: 'mobile', width: 32 },
      { header: 'email', key: 'email', width: 32 },
      { header: 'url', key: 'url', width: 32 },
    ]
    sheet.addRow({
      name: data.name,
      description: data.description,
      address1: data.address1,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      mobile: data.mobile,
      email: data.email,
      url: data.url,
    })
    workbook.xlsx
      .writeBuffer(fileName)
      .then(() => {
        console.log('file created')
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className="text-center">
      <CCard className="mt-3">
        <CCardHeader className="bg-dark">
          <h3 className="text-white">Church Table</h3>
        </CCardHeader>
        <CCardBody>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link to="/forms/church-form">
              <CButton color="primary">Add New Church</CButton>
            </Link>
            <Link to="">
              <CButton color="primary" onClick={window.print}>
                Print
              </CButton>
            </Link>
            <Link to="">
              <CButton color="primary" onClick={exportData}>
                Export
              </CButton>
            </Link>
            <div className="ms-auto mb-3">
              <input
                type="text"
                placeholder="Search Here"
                className="p-2 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <DataTable
            columns={column}
            data={filteredChurches}
            customStyles={customStyles}
            pagination
            fixedHeader
            selectableRows
            selectableRowsHighlight
            highlightOnHover
            // <Link to="/forms/church-form">
            //   <CButton color="primary">AddChurch</CButton>
            // </Link>
            //

            // subHeader
            // subHeaderComponent={
            //   <input
            //     type="text"
            //     placeholder="Search Here"
            //     className="w-25 form-control"
            //     value={search}
            //     onChange={(e) => setSearch(e.target.value)}
            //   />
            // }
          />
        </CCardBody>
      </CCard>
    </div>
  )
}

export default ChurchTable
