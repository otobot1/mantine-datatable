import { createStyles } from '@mantine/core';
import dayjs from 'dayjs';
import { DataTable } from 'mantine-datatable';
import { employees } from '~/data';

const records = employees.slice(0, 10);

const useStyles = createStyles((theme) => ({
  idColumnCells: { fontWeight: 700 },
  birthdayColumnTitle: { '&&': { color: theme.colors.blue[6] } },
  birthdayInDecember: {
    fontWeight: 700,
    color: theme.colors.blue[6],
    background: theme.fn.rgba(theme.colors.yellow[6], 0.25),
  },
}));

export default function ColumnPropertiesExampleStylingCells() {
  const { classes, cx } = useStyles();

  return (
    <DataTable
      withBorder
      withColumnBorders
      striped
      records={records}
      columns={[
        {
          accessor: 'index',
          title: '#',
          textAlignment: 'right',
          width: 40,
          // style cells with a class name
          cellsClassName: classes.idColumnCells,
          render: (record) => records.indexOf(record) + 1,
        },
        {
          accessor: 'name',
          title: 'Full name',
          width: 160,
          // style cells with a CSS properties object
          cellsStyle: {
            fontStyle: 'italic',
          },
          render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
        },
        { accessor: 'email' },
        {
          accessor: 'department.name',
          width: 150,
          // style title with an Sx object
          titleSx: (theme) => ({ '&&': { color: theme.colors.green[6] } }),
          // style cells with an Sx object
          cellsSx: (theme) => ({
            color: theme.colors.green[8],
            background: theme.fn.rgba(theme.colors.orange[6], 0.25),
          }),
        },
        {
          accessor: 'department.company.name',
          title: 'Company',
          width: 150,
          ellipsis: true,
        },
        {
          accessor: 'birthDate',
          title: 'Birthday',
          width: 100,
          // style title with a custom class name
          titleClassName: classes.birthdayColumnTitle,
          // style cells with a class name depending on current record
          cellsClassName: ({ birthDate }) =>
            cx({ [classes.birthdayInDecember]: dayjs(birthDate).format('MM') === '12' }),
          render: ({ birthDate }) => dayjs(birthDate).format('MMM D'),
        },
        {
          accessor: 'age',
          width: 60,
          textAlignment: 'right',
          // style title with a CSS properties object
          titleStyle: { fontStyle: 'italic' },
          // style cells with a CSS properties object depending on current record
          cellsStyle: ({ birthDate }) =>
            dayjs().diff(birthDate, 'years') <= 40
              ? {
                  fontWeight: 'bold',
                  color: 'green',
                  background: '#FF332222',
                }
              : undefined,
          render: ({ birthDate }) => dayjs().diff(birthDate, 'years'),
        },
      ]}
    />
  );
}
