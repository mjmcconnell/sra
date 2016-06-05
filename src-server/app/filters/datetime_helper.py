# stdlib imports
import datetime
import logging
import re


def format_timestamp(timestamp, pattern='%Y-%m-%dT%H:%M', new_format='%B %Y'):
    # Remove the offset from the timestamp
    org_timestamp = timestamp
    tz_pattern = r'(\D*\d{4})$'
    tz_offset = re.findall(tz_pattern, timestamp)
    if tz_offset:
        tz_offset = tz_offset[0]
        timestamp = timestamp.replace(tz_offset, '')

    try:
        ts_datetime = datetime.datetime.strptime(timestamp, pattern)
    except ValueError as e:
        logging.exception(e.message)
        return org_timestamp

    # Return the timestamp minus the offset
    return ts_datetime.strftime(new_format)
