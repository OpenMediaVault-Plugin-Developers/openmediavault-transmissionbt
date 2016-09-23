/**
 * Copyright (C) 2011-2012 Marcel Beck <marcel.beck@mbeck.org>
 * Copyright (C) 2013-2016 OpenMediaVault Plugin Developers
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

// require("js/omv/WorkspaceManager.js")
// require("js/omv/workspace/form/Panel.js")
// require("js/omv/form/field/SharedFolderComboBox.js")
// require("js/omv/form/plugin/LinkedFields.js")
// require("js/omvextras/form/field/plugin/PermissionsInfo.js")

Ext.define('OMV.module.admin.service.transmissionbt.FilesAndLocations', {
    extend: 'OMV.workspace.form.Panel',
    requires: [
        'OMV.form.field.SharedFolderComboBox'
    ],

    rpcService: 'TransmissionBt',
    rpcGetMethod: 'getFilesAndLocationsSettings',
    rpcSetMethod: 'setFilesAndLocationsSettings',

    plugins: [{
        ptype: 'linkedfields',
        correlations: [{
            name: [
                'incomplete-sharedfolderref',
                'incomplete-dir'
            ],
            conditions: [{
                name: 'incomplete-dir-enabled',
                value: true
            }],
            properties: [
                '!readOnly',
                '!allowBlank'
            ]
        }, {
            name: [
                'watch-sharedfolderref',
                'watch-dir'
            ],
            conditions: [{
                name: 'watch-dir-enabled',
                value: true
            }],
            properties: [
                '!readOnly',
                '!allowBlank'
            ]
        }]
    }],

    getFormItems: function() {
        return [{
            xtype: 'fieldset',
            title: _('Locations'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'fieldset',
                title: _('Download'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'sharedfoldercombo',
                    name: 'download-sharedfolderref',
                    fieldLabel: _('Shared folder'),
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('Make sure the user \'debian-transmission\' has read and write access to the shared folder.')
                    }, {
                        ptype: 'permissionsinfo',
                        username: 'debian-transmission',
                        execute: true,
                        read: true,
                        write: true

                    }]
                }, {
                    xtype: 'textfield',
                    name: 'download-dir',
                    fieldLabel: _('Directory'),
                    allowBlank: true,
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('Directory to keep downloads. If incomplete is enabled, only complete downloads will be stored here.')
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: _('Incomplete'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'checkbox',
                    name: 'incomplete-dir-enabled',
                    fieldLabel: _('Enable'),
                    checked: false,
                    boxLabel: _('Enable incomplete directory.')
                }, {
                    xtype: 'sharedfoldercombo',
                    name: 'incomplete-sharedfolderref',
                    fieldLabel: _('Shared folder'),
                    allowBlank: true,
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('Make sure the user \'debian-transmission\' has read and write access to the shared folder.')
                    }, {
                        ptype: 'permissionsinfo',
                        username: 'debian-transmission',
                        execute: true,
                        read: true,
                        write: true

                    }]
                }, {
                    xtype: 'textfield',
                    name: 'incomplete-dir',
                    fieldLabel: _('Directory'),
                    allowBlank: true,
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('Directory to keep files in until torrent is complete.')
                    }]
                }]
            }, {
                xtype: 'fieldset',
                title: _('Watch'),
                defaults: {
                    labelSeparator: ''
                },
                items: [{
                    xtype: 'checkbox',
                    name: 'watch-dir-enabled',
                    fieldLabel: _('Enable'),
                    checked: false,
                    boxLabel: _('Enable Watch directory.')
                }, {
                    xtype: 'sharedfoldercombo',
                    name: 'watch-sharedfolderref',
                    fieldLabel: _('Shared folder'),
                    allowBlank: true,
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('Make sure the user \'debian-transmission\' has read and write access to the shared folder.')
                    }, {
                        ptype: 'permissionsinfo',
                        username: 'debian-transmission',
                        execute: true,
                        read: true,
                        write: true
                    }]
                }, {
                    xtype: 'textfield',
                    name: 'watch-dir',
                    fieldLabel: _('Directory'),
                    allowBlank: true,
                    plugins: [{
                        ptype: 'fieldinfo',
                        text: _('Watch a directory for torrent files and add them to transmission')
                    }]
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: _('Files'),
            defaults: {
                labelSeparator: ''
            },
            items: [{
                xtype: 'combo',
                name: 'preallocation',
                fieldLabel: _('Preallocation'),
                queryMode: 'local',
                store: Ext.create('Ext.data.SimpleStore', {
                    fields: [
                        'value',
                        'text'
                    ],
                    data: [
                        [0, _('Off')],
                        [1, _('Fast')],
                        [2, _('Full')]
                    ]
                }),
                displayField: 'text',
                valueField: 'value',
                allowBlank: false,
                editable: false,
                triggerAction: 'all',
                value: 1,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Mode for preallocating files.')
                }]
            }, {
                xtype: 'checkbox',
                name: 'rename-partial-files',
                fieldLabel: _('Postfix'),
                checked: true,
                boxLabel: _('Postfix partially downloaded files with .part.')
            }, {
                xtype: 'checkbox',
                name: 'start-added-torrents',
                fieldLabel: _('Start torrents'),
                checked: true,
                boxLabel: _('Start torrents as soon as they are added.')
            }, {
                xtype: 'checkbox',
                name: 'trash-original-torrent-files',
                fieldLabel: _('Trash original'),
                checked: false,
                boxLabel: _('Delete torrents added from the watch directory.')
            }, {
                xtype: 'numberfield',
                name: 'umask',
                fieldLabel: _('Umask'),
                allowDecimals: false,
                allowNegative: false,
                allowBlank: false,
                value: 18,
                plugins: [{
                    ptype: 'fieldinfo',
                    text: _('Sets transmission\'s file mode creation mask.')
                }]
            }]
        }];
    }
});

OMV.WorkspaceManager.registerPanel({
    id: 'files-and-locations',
    path: '/service/transmissionbt',
    text: _('Files and Locations'),
    position: 40,
    className: 'OMV.module.admin.service.transmissionbt.FilesAndLocations'
});
