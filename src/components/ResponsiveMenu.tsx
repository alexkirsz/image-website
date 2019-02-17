import React from "react";
import { makeStyles } from "@material-ui/styles";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import MailIcon from "@material-ui/icons/MailTwoTone";
import Link from "@/components/Link";
import { FormattedMessage } from "react-intl";
import { ListItemProps } from "@material-ui/core/ListItem";
import { MenuItem } from "@/components/MenuItem";

function ListItemLink({ to, ...otherProps }: { to: string } & ListItemProps) {
  return (
    <ListItem button {...otherProps} component={Link} {...{ to } as any} />
  );
}

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

export default function ResponsiveMenu({
  items,
  onSelect,
}: {
  items: Array<MenuItem>;
  onSelect: () => void;
}) {
  const styles = useStyles();

  return (
    <List classes={{ root: styles.root }}>
      {items.map(item => (
        <ListItemLink to={item.to} button key={item.to} onClick={onSelect}>
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemLink>
      ))}
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary={<FormattedMessage id="menu_contact" />} />
      </ListItem>
    </List>
  );
}
