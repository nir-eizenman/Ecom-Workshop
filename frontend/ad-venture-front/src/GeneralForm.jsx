import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  OutlinedInput,
} from '@mui/material';
import _ from 'lodash';

const GeneralForm = ({ schema, formData, setFormData }) => {
  const renderForm = (schema, parentKey = '') => {
    return Object.entries(schema).map(([key, value]) => {
      const fieldKey = parentKey ? `${parentKey}.${key}` : key;

      if (value.type === undefined && typeof value === 'object') {
        return (
          <Box key={fieldKey} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
            <Typography variant="h6" gutterBottom>{key}</Typography>
            <Grid container spacing={2} p={1}>
              {renderForm(value, fieldKey)}
            </Grid>
          </Box>
        );
      } else {
        return (
          <Grid item xs={12} key={fieldKey} my={1}>
            {renderField(key, value, fieldKey)}
          </Grid>
        );
      }
    });
  };

  const renderField = (key, value, fieldKey) => {
    const handleChange = (event) => {
      const { name, value: inputValue, type: inputType, checked } = event.target;
      setFormData(prevState => {
        const keys = name.split('.');
        const newFormData = { ...prevState };
        let temp = newFormData;

        keys.forEach((k, index) => {
          if (index === keys.length - 1) {
            if (value.type === 'multiselect' || value.type === 'multiselectpercent') {
              temp[k] = typeof inputValue === 'string' ? inputValue.split(',') : inputValue;
            } else {
              temp[k] = inputType === 'checkbox' ? checked : inputValue;
            }
          } else {
            temp[k] = { ...temp[k] };
            temp = temp[k];
          }
        });

        return newFormData;
      });
    };

    switch (value.type) {
      case 'boolean':
        return (
          <FormControlLabel
            control={
              <Checkbox
                name={fieldKey}
                checked={Boolean(_.get(formData, fieldKey, false))}
                onChange={handleChange}
                color="primary"
              />
            }
            label={value.label}
          />
        );
      case 'int':
        return (
          <TextField
            name={fieldKey}
            label={value.label}
            type="number"
            fullWidth
            value={_.get(formData, fieldKey, '')}
            onChange={handleChange}
          />
        );
      case 'percent':
        return value.options.map(option => (
          <TextField
            key={`${fieldKey}.${option}`}
            name={`${fieldKey}.${option}`}
            label={`${value.label} - ${option}`}
            type="number"
            fullWidth
            value={_.get(formData, `${fieldKey}.${option}`, '')}
            onChange={handleChange}
          />
        ));
      case 'multiselect':
        return (
          <FormControl fullWidth>
            <InputLabel>{value.label}</InputLabel>
            <Select
              multiple
              value={_.get(formData, fieldKey, [])}
              onChange={handleChange}
              input={<OutlinedInput label={value.label} />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((val) => (
                    <Chip key={val} label={val} />
                  ))}
                </Box>
              )}
              name={fieldKey}
            >
              {value.options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'multiselectpercent':
        const selectedOptions = _.get(formData, fieldKey, []);
        const handleMultiselectPercentChange = (event) => {
          const { name, value: inputValue } = event.target;
          setFormData(prevState => {
            const newFormData = { ...prevState };
            _.set(newFormData, name, inputValue);
            return newFormData;
          });
        };
        return (
          <>
            <FormControl fullWidth>
              <InputLabel>{value.label}</InputLabel>
              <Select
                multiple
                value={selectedOptions}
                onChange={(event) => {
                  const { name, value: selectedValues } = event.target;
                  setFormData(prevState => {
                    const newFormData = { ...prevState };
                    _.set(newFormData, name, selectedValues);
                    return newFormData;
                  });
                }}
                input={<OutlinedInput label={value.label} />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((val) => (
                      <Chip key={val} label={val} />
                    ))}
                  </Box>
                )}
                name={fieldKey}
              >
                {value.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {selectedOptions.map(option => (
              <TextField
                key={`${fieldKey}.${option}`}
                name={`${fieldKey}.${option}`}
                label={`${value.label} - ${option}`}
                type="number"
                fullWidth
                value={_.get(formData, `${fieldKey}.${option}`, '')}
                onChange={handleMultiselectPercentChange}
              />
            ))}
          </>
        );
      default:
        return (
          <TextField
            name={fieldKey}
            label={value.label}
            type="text"
            fullWidth
            value={_.get(formData, fieldKey, '')}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <Box>
      {renderForm(schema)}
    </Box>
  );
};

export default GeneralForm;
