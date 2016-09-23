<?php

/**
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

use OMV\System\LogFileSpec;

// Register new logfile type.
// Format:
// Jan 1 00:00:00 <hostname> transmission-daemon[<pid>]: <message>
LogFileSpec::registerSpecification(
    'transmissionbt',
    [
        'filename' => 'transmissionbt',
        'filepath' => '/var/log/transmissionbt.log',
        'regex' => '/^(\S+\s+\d+\s+\S+)\s+(\S+)\s+transmission-daemon\[\d+\]:\s+(.*)$/',
        'columns' => [
            'ts' => [
                'index' => 1,
                'func' => function ($date) {
                    return strpdate($date, 'M j G:i:s');
                },
            ],
            'date' => [
                'index' => 1,
                'func' => function ($date) {
                    return strftime('%c', strpdate($date, 'M j G:i:s'));
                },
            ],
            'event' => 3,
        ],
    ]
);
