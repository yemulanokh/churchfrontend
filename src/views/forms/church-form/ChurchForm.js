import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CInputGroup,
  CFormLabel,
  CFormTextarea,
  CRow,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import {
  cilLockLocked,
  cilUser,
  cilLocationPin,
  cilCircle,
  cilPhone,
  cilMobile,
  cilPin,
  cilList,
} from '@coreui/icons'

import { DocsExample } from 'src/components'

const ChurchForm = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4 col-8 m-auto">
          <CCardHeader className="text-center">
            <strong>Add Church</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/form-control">
              <CForm>
                <CFormLabel htmlFor="name">
                  Church Name<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput type="text" id="name" placeholder="Enter Church Name" />
                </CInputGroup>
                <CFormLabel htmlFor="description">
                  Description<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilList}></CIcon>
                  </CInputGroupText>
                  <CFormTextarea
                    id="description"
                    rows="3"
                    placeholder="Enter Description"
                  ></CFormTextarea>
                </CInputGroup>
                <CFormLabel htmlFor="address1">
                  Address1<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLocationPin} />
                  </CInputGroupText>
                  <CFormInput type="text" id="address1" placeholder="Enter Address1" />
                </CInputGroup>
                <CFormLabel htmlFor="address2">Address2</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLocationPin} />
                  </CInputGroupText>
                  <CFormInput type="text" id="address2" placeholder="Enter Address2" />
                </CInputGroup>
                <CFormLabel htmlFor="city">
                  City<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCircle} />
                  </CInputGroupText>
                  <CFormInput type="text" id="city" placeholder="Enter City" />
                </CInputGroup>
                <CFormLabel htmlFor="state">
                  State<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCircle} />
                  </CInputGroupText>
                  <select className="form-select" aria-label="Default select example">
                    <option value="1">AL</option>
                    <option value="2">AK</option>
                    <option value="3">AZ</option>
                    <option value="1">AR</option>
                    <option value="2">CA</option>
                    <option value="3">CO</option>
                    <option value="1">CT</option>
                    <option value="2">CR</option>
                    <option value="3">DE</option>
                    <option value="1">FL</option>
                    <option value="2">GA</option>
                    <option value="3">HI</option>
                    <option value="1">ID</option>
                    <option value="2">IL</option>
                    <option value="3">IN</option>
                    <option value="1">KS</option>
                    <option value="2">KY</option>
                    <option value="3">ME</option>
                    <option value="1">MD</option>
                    <option value="2">MA</option>
                    <option value="3">MI</option>
                    <option value="1">UT</option>
                    <option value="2">OR</option>
                    <option value="3">NY</option>
                    <option value="3">WH</option>
                  </select>
                </CInputGroup>
                <CFormLabel htmlFor="zipcode">
                  Zipcode<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCircle} />
                  </CInputGroupText>
                  <CFormInput type="text" id="zipcode" placeholder="Enter Zipcode" />
                </CInputGroup>
                <CFormLabel htmlFor="number">
                  Mobile No.<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilMobile} />
                  </CInputGroupText>
                  <CFormInput type="number" id="number" placeholder="Enter Mobile No." />
                </CInputGroup>
                <CFormLabel htmlFor="email">
                  Email<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="email" id="email" placeholder="Enter Email." />
                </CInputGroup>
                <CFormLabel htmlFor="url">
                  Church URL<span style={{ color: 'red' }}>*</span>
                </CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput type="text" id="text" placeholder="Enter Church URL." />
                </CInputGroup>
                <div className="gap-2 d-md-flex justify-content-md-center">
                  <Link to="/forms/church-table">
                    <CButton>Submit</CButton>
                  </Link>
                  <Link to="/forms/church-table">
                    <CButton>Cancel</CButton>
                  </Link>
                </div>
                {/* </div> */}
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ChurchForm
