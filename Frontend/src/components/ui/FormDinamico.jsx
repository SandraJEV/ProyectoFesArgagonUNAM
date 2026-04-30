import { useEffect, useState, useRef, forwardRef } from "react";
import { Link } from "react-router-dom";
import { Input } from "./input";
import { Label } from "./label";
import { Select } from "./Select";
import { Button } from "./button";
import { TextArea } from "./textArea";
import { DateInput } from "./dateInput";
import { CheckBox } from "./check";
import { FormMensajes } from "./FormMensajes";
import api from "../../services/api";
import { groupFieldsById } from "../../utils/groupFormFields";
import { validateField } from "../../utils/formValidation";
import { getCleanFormData } from "../../utils/formHelpers";

const DynamicForm = forwardRef(
  ({ formId = 2, onSubmit, formError, onChange }, ref) => {
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [formButtons, setFormButtons] = useState([]);

    const loadedFormIdRef = useRef(null);

    const handleClear = () => {
      const resetValues = {};
      formFields.forEach((f) => {
        resetValues[f.fieldName] =
          f.type === "checkbox" ? false : f.type === "select" ? null : "";
      });
      setFormData(resetValues);
      setErrors({});
    };

    useEffect(() => {
      if (loadedFormIdRef.current === formId) return;

      loadedFormIdRef.current = formId;

      api
        .get(`/FormRender/${formId}`)
        .then((res) => {
          const { fields, buttons } = res.data;

          const grouped = groupFieldsById(fields);

          // 🔥 normalizar selects
          grouped.forEach((field) => {
            if (field.type === "select" && typeof field.options === "string") {
              try {
                const parsed = JSON.parse(field.options);
                field.options = parsed.map((opt) => ({
                  id: opt.Id ?? opt.id,
                  name: opt.Name ?? opt.name,
                }));
              } catch {
                field.options = [];
              }
            }
          });

          setFormFields(grouped);
          setFormButtons(buttons);
          console.log(res.data);
          
          const initialValues = {};
          grouped.forEach((f) => {
            initialValues[f.fieldName] =
              f.type === "select" ? null : f.type === "checkbox" ? false : "";
          });

          setFormData(initialValues);
        })
        .catch((err) => console.error("Error al cargar campos dinámicos", err));
    }, [formId]);

    const handleSubmit = (e) => {
      e.preventDefault();

      const newErrors = {};

      formFields.forEach((field) => {
        const value = formData[field.fieldName];
        const errs = validateField(value, field.validations, formData);

        if (errs.length) {
          newErrors[field.fieldName] = errs;
        }
      });

      setErrors(newErrors);

      if (Object.keys(newErrors).length === 0) {
        const finalData = getCleanFormData(formData);
        console.log("SUBMIT FORM:", finalData);

        onSubmit?.(finalData);
      }
    };

    return (
      <form ref={ref} className="space-y-6" onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.fieldId}>
            <Label htmlFor={field.fieldName}>{field.label}</Label>

            {field.type === "select" ? (
              <Select
                options={[{ id: null, name: "Seleccionar" }, ...field.options]}
                selected={formData[field.fieldName] || null}
                onChange={(selectedOption) => {
                  const updated = {
                    ...formData,
                    [field.fieldName]: selectedOption,
                  };
                  setFormData(updated);

                  const validation = validateField(
                    selectedOption,
                    field.validations,
                    updated,
                  );
                  setErrors({ ...errors, [field.fieldName]: validation });
                }}
              />
            ) : field.type === "textarea" ? (
              <TextArea
                value={formData[field.fieldName] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...formData, [field.fieldName]: value };
                  setFormData(updated);

                  const validation = validateField(
                    value,
                    field.validations,
                    updated,
                  );
                  setErrors({ ...errors, [field.fieldName]: validation });
                }}
              />
            ) : field.type === "date" ? (
              <DateInput
                value={formData[field.fieldName] || ""}
                onChange={(value) => {
                  const updated = { ...formData, [field.fieldName]: value };
                  setFormData(updated);

                  const validation = validateField(
                    value,
                    field.validations,
                    updated,
                  );
                  setErrors({ ...errors, [field.fieldName]: validation });
                }}
              />
            ) : field.type === "checkbox" ? (
              <CheckBox
                checked={formData[field.fieldName] || false}
                onChange={(e) => {
                  const value = e.target.checked;
                  const updated = { ...formData, [field.fieldName]: value };
                  setFormData(updated);

                  const validation = validateField(
                    value,
                    field.validations,
                    updated,
                  );
                  setErrors({ ...errors, [field.fieldName]: validation });
                }}
              />
            ) : field.type === "link" ? (
              <div className="mt-3 text-center">
                <Link
                  to={field.linkHref || "/"}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  {field.linkText}
                </Link>
              </div>
            ) : (
              <Input
                value={formData[field.fieldName] || ""}
                type={field.type}
                onChange={(e) => {
                  const value = e.target.value;
                  const updated = { ...formData, [field.fieldName]: value };
                  setFormData(updated);

                  const validation = validateField(
                    value,
                    field.validations,
                    updated,
                  );
                  setErrors({ ...errors, [field.fieldName]: validation });
                }}
              />
            )}

            <FormMensajes messages={errors[field.fieldName] || []} />
          </div>
        ))}

        {formError && (
          <div className="text-red-500 text-sm text-center mb-3">
            {formError}
          </div>
        )}

        <div className="flex gap-4">
          {formButtons.map((btn) => (
            <Button
              key={btn.buttonId}
              type={btn.type || "button"}
              onClick={(e) => {
                if (btn.type === "submit") return;

                e.preventDefault();

                if (btn.label.toLowerCase() === "limpiar") {
                  handleClear();
                }
              }}
            >
              {btn.label}
            </Button>
          ))}
        </div>
      </form>
    );
  },
);

export default DynamicForm;
