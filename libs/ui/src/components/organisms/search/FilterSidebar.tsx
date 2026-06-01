import {
  FormTypeSearchProperty,
  formDefaultValuesSearchProperties,
} from '@mockp/forms/src/searchProperties';
import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { Button } from '../../atoms/Button';
import { IconFilter } from '@tabler/icons-react';
import { PulsingDot } from '../../atoms/Dot';
import { Sidebar } from '../Sidebar';
import { RangeSlider } from '../../molecules/RangeSlider';
import {
  ToggleButtonGroup,
  ToggleButton,
} from '../../molecules/ToggleButtonGroup';
import { FilterHeading } from '../../molecules/FilterHeading';
import { IconTypes } from '../../molecules/IconTypes';

export const FilterSidebar = () => {
  const [open, setOpen] = useState(false);
  const {
    control,
    reset,
    getValues,
    formState: { dirtyFields },
  } = useFormContext<FormTypeSearchProperty>();

  return (
    <>
      <Button
        size="sm"
        variant="text"
        onClick={() => setOpen(true)}
        className=" hover:bg-gray-200"
      >
        <IconFilter className="stroke-1.5 text-black" />
        {Object.values(dirtyFields).length ? <PulsingDot /> : null}
      </Button>
      <Sidebar open={open} setOpen={setOpen} blur={false}>
        <div className="flex flex-col items-start gap-3">
          <Controller
            name="types"
            control={control}
            render={({
              field: { value = [], onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div>
                  <FilterHeading dirty={isDirty} title="Características" />
                  <ToggleButtonGroup
                    value={value}
                    onChange={(_, value) => {
                      onChange(value.sort());
                    }}
                    aria-label="property features"
                  >
                    {defaultValues?.types?.map((val) => {
                      if (!val) return null;
                      return (
                        <ToggleButton
                          key={val}
                          value={val}
                          selected={value.includes(val)}
                        >
                          {IconTypes[val]}
                        </ToggleButton>
                      );
                    })}
                  </ToggleButtonGroup>
                </div>
              );
            }}
          />
          <Controller
            name="listPrice"
            control={control}
            render={({
              field: { value, onChange },
              fieldState: { isDirty },
              formState: { defaultValues },
            }) => {
              return (
                <div className="w-full">
                  <FilterHeading dirty={isDirty} title="Preço" />
                  <RangeSlider
                    min={defaultValues?.listPrice?.[0]}
                    max={defaultValues?.listPrice?.[1]}
                    value={value}
                    onChange={onChange}
                    valueLabelFormat={(sliderValue) =>
                      `$ ${sliderValue.toLocaleString()}`
                    }
                    step={50}
                  />
                </div>
              );
            }}
          />
          <Button
            onClick={() =>
              reset({ ...getValues(), ...formDefaultValuesSearchProperties })
            }
            disabled={!Object.values(dirtyFields).length}
          >
            Reset
          </Button>
        </div>
      </Sidebar>
    </>
  );
};
