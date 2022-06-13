import { Grid, Card, Tabs, Tab, Box } from "@mui/material";
import { useState } from "react";
import Driver from "../Driver";
import AssignedVehiclesList from "../AssignedVehiclesList";
import { useSelector } from "react-redux";

const TabPanel = (props) => {
const { children, value, index } = props;
return (
  <div role="tabpanel" hidden={value !== index}>
    {value === index && <Box>{children}</Box>}
  </div>
);
};

function DriverAssignDriver() {

    const usertype = useSelector((state)=>state.user)
const [value, setValue] = useState(0);
const handleChange = (event, newValue) => {
  setValue(newValue);
}

  return (
      <>
    <Grid item lg={5} sm={7} xs={12}>
        <Card sx={{ width: "100%", height: "100%" }}>
          <Box sx={{ mx: 3, height: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                textColor="secondary"
                indicatorColor="secondary"
                onChange={handleChange}
              >
                <Tab
                  label="All Drivers"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                ></Tab>
            {((usertype.is_head.toString()==='true')||(usertype.is_manager.toString()==='true')||(usertype.is_driver.toString()==='true'))&&
                <Tab
                  label="Driver with Vehicle Assigned"
                  sx={{ textTransform: "none", fontWeight: "bold" }}
                ></Tab>
            }
                
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Driver/>
            </TabPanel>
            <TabPanel value={value} index={1}>
            {((usertype.is_head.toString()==='true')||(usertype.is_manager.toString()==='true')||(usertype.is_driver.toString()==='true'))&&
            <AssignedVehiclesList/>
            }
            </TabPanel>
          </Box>
        </Card>
      </Grid>
    </>
  )
}

export default DriverAssignDriver