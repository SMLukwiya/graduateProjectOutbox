import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Paper} from "@material-ui/core";
import {Link} from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import DraftsIcon from '@material-ui/icons/Drafts';
import { Typography, Avatar, List, ListItem,
        ListItemText, ListItemAvatar, ListItemIcon } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '30vh'
  },
  list: {
   width: '100%',
   maxWidth: 360,
   backgroundColor: theme.palette.background.paper,
 },
  mainPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    margin: theme.spacing(4)
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainPostContent: {
    position: 'relative',
    padding: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(5),
      paddingRight: 0
    }},
    link: {
      color: "#80deea"
    }
}));

export default function FooterTabs() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.mainPost}>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={4}>
              <div className={classes.mainPostContent}>
                <Typography align="center" component="h2" variant="h6" color="inherit" gutterBottom>
                  Contact Us
                </Typography>
                <List dense className={classes.list}>
                  <Link>
                    <ListItem button>
                      <ListItemIcon>
                        <DraftsIcon style={{ height: 35, width: 35 }}/>
                      </ListItemIcon>
                      <ListItemText primary={"Write to us"}/>
                    </ListItem>
                 </Link>
                 <Link>
                   <ListItem button>
                     <ListItemIcon>
                         <SocialIcon network="twitter" fgColor="#fff" style={{ height: 35, width: 35 }}/>
                     </ListItemIcon>
                     <ListItemText primary={"twitter"}/>
                   </ListItem>
                </Link>
                <Link>
                  <ListItem button>
                    <ListItemIcon>
                      <SocialIcon network="facebook" fgColor="#fff" style={{ height: 35, width: 35 }}/>
                    </ListItemIcon>
                    <ListItemText primary={"facebook"}/>
                  </ListItem>
               </Link>
               <Link>
                 <ListItem button>
                   <ListItemIcon>
                      <SocialIcon network="instagram" fgColor="#fff" style={{ height: 35, width: 35 }}/>
                   </ListItemIcon>
                   <ListItemText primary={"instagram"}/>
                 </ListItem>
               </Link>
            </List>
            </div>
            </Grid>
            <Grid item md={4}>
              <div className={classes.mainPostContent}>
                <Typography align="center" component="h2" variant="h6" color="inherit" gutterBottom>
                  Resources
                </Typography>
                <List dense className={classes.list}>
                  <Link>
                    <ListItem button>
                      <ListItemText primary={"resource number 1"}/>
                    </ListItem>
                 </Link>
                 <Link>
                   <ListItem button>
                     <ListItemText primary={"resource number 2"}/>
                   </ListItem>
                </Link>
                <Link>
                  <ListItem button>
                    <ListItemText primary={"resource number 3"}/>
                  </ListItem>
               </Link>
               <Link>
                 <ListItem button>
                   <ListItemText primary={"resource number 4"}/>
                 </ListItem>
               </Link>
               <Link>
                 <ListItem button>
                   <ListItemText primary={"resource number 5"}/>
                 </ListItem>
               </Link>
            </List>
              </div>
            </Grid>
            <Grid item md={4}>
              <div className={classes.mainPostContent}>
                <Typography align="center" component="h2" variant="h6" color="inherit" gutterBottom>
                  Stuff
                </Typography>
                <List dense className={classes.list}>
                  <Link>
                    <ListItem button>
                      <ListItemText primary={"other stuff number 1"}/>
                    </ListItem>
                 </Link>
                 <Link>
                   <ListItem button>
                     <ListItemText primary={"other stuff number 2"}/>
                   </ListItem>
                </Link>
                <Link>
                  <ListItem button>
                    <ListItemText primary={"other stuff number 3"}/>
                  </ListItem>
               </Link>
               <Link>
                 <ListItem button>
                   <ListItemText primary={"other stuff number 4"}/>
                 </ListItem>
               </Link>
               <Link>
                 <ListItem button>
                   <ListItemText primary={"other stuff number 5"}/>
                 </ListItem>
               </Link>
            </List>
              </div>
            </Grid>
          </Grid>
        </Paper>
    </div>
  );
}
