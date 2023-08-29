| [Home](../README.md) |
|----------------------|

# Installation
1. To install a widget, click **Content Hub** > **Discover**.
2. Search for the **Record Summary** widget.
3. Click the **Record Summary** widget card.
4. Click **Install** on the lower part of the screen to begin installation.

# Configuration

The following sections lay out information necessary to customize this widget.

## Record Containing JSON Data

| Fields                                     | Description                                                                                                                                                |
|--------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| JSON Data Source Modules                   | Select the module from which to fetch the data                                                                                                             |
| Select Field                               | Select the field(Column) containing the `JSON` data                                                                                                        |
| Filter Record Which Contains The JSON Data | Add conditions to retrieve only the records meeting the filter conditions. If multiple records match the conditions given, the first record is considered. |

## Get Live Data

| Fields                                  | Description                                                                                                                         |
|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| Title                                   | Specify a title for the record summary Tile.                                                                                        |
| Data Source                             | Select the module containing JSON data.                                                                                             |
| Select Field                            | Select a field from the module containing the JSON data.                                                                            |
| Filter  Condition                       | Filter records containing the JSON data. It is recommended to apply filters that return only 1 record i.e. by using a unique field. |
| Enter the key of object to be rendered. | Leave blank if the JSON field's record has data in the required format, else specify the key containing the relevant data.          |

| [Usage](./usage.md) |
|---------------------|