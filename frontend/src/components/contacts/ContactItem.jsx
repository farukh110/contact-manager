import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Stack } from '@mui/material';

import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';


const ContactItem = ({ contact }) => {

  const contactContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearContact } = contactContext;

  const { id, name, email, phone, type } = contact;

  const onDelete = () => {

    deleteContact(id);
    clearContact();
  }

  return (
    <div style={{ paddingBottom: '15px', paddingTop: '15px' }}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="body2">

            <h3 className="text-primary text-left">

              {name} {'   '}

              <Button style={{ float: 'right' }} variant={(type === 'professional' ? 'contained' : 'outlined')}>

                {type.charAt(0).toUpperCase() + type.slice(1)}

              </Button>
            </h3>

            <nav aria-label="main mailbox folders">
              <List>

                {
                  email && (
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <EmailIcon />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                      </ListItemButton>
                    </ListItem>
                  )
                }
                {
                  phone && (
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PhoneIcon />
                        </ListItemIcon>
                        <ListItemText primary={phone} />
                      </ListItemButton>
                    </ListItem>
                  )
                }

              </List>
            </nav>

            <Stack direction="row" spacing={2}>

              <Button variant="outlined" onClick={() => setCurrent(contact)} color="error">
                Edit
              </Button>


              <Button variant="contained" onClick={onDelete} color="success">
                Delete
              </Button>

            </Stack>

          </Typography>
        </CardContent>

      </Card>
    </div>
  )
}

ContactItem.propTypes = {

  contact: PropTypes.object.isRequired

}

export default ContactItem;
