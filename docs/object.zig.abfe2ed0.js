var data = {lines:[
{"lineNum":"    1","line":"// glinka"},
{"lineNum":"    2","line":"// Copyright (C) 2021-2022 Ollie Etherington"},
{"lineNum":"    3","line":"// <www.etherington.io>"},
{"lineNum":"    4","line":"//"},
{"lineNum":"    5","line":"// This program is free software: you can redistribute it and/or modify"},
{"lineNum":"    6","line":"// it under the terms of the GNU Affero General Public License as published"},
{"lineNum":"    7","line":"// by the Free Software Foundation, either version 3 of the License, or"},
{"lineNum":"    8","line":"// (at your option) any later version."},
{"lineNum":"    9","line":"//"},
{"lineNum":"   10","line":"// This program is distributed in the hope that it will be useful,"},
{"lineNum":"   11","line":"// but WITHOUT ANY WARRANTY; without even the implied warranty of"},
{"lineNum":"   12","line":"// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the"},
{"lineNum":"   13","line":"// GNU Affero General Public License for more details."},
{"lineNum":"   14","line":"//"},
{"lineNum":"   15","line":"// You should have received a copy of the GNU Affero General Public License"},
{"lineNum":"   16","line":"// along with this program. If not, see <http://www.gnu.org/licenses/>."},
{"lineNum":"   17","line":""},
{"lineNum":"   18","line":"const std = @import(\"std\");"},
{"lineNum":"   19","line":"const Cursor = @import(\"../../common/cursor.zig\").Cursor;"},
{"lineNum":"   20","line":"const Type = @import(\"../../common/types/type.zig\").Type;"},
{"lineNum":"   21","line":"const Compiler = @import(\"../compiler.zig\").Compiler;"},
{"lineNum":"   22","line":"const Scope = @import(\"../scope.zig\").Scope;"},
{"lineNum":"   23","line":"const TypeBook = @import(\"../typebook.zig\").TypeBook;"},
{"lineNum":"   24","line":"const CompileError = @import(\"../errors/compile_error.zig\").CompileError;"},
{"lineNum":"   25","line":"const GenericError = @import(\"../errors/generic_error.zig\").GenericError;"},
{"lineNum":"   26","line":"const node = @import(\"../../common/node.zig\");"},
{"lineNum":"   27","line":"const InferResult = @import(\"infer_result.zig\").InferResult;"},
{"lineNum":"   28","line":"const InferContext = @import(\"infer_context.zig\").InferContext;"},
{"lineNum":"   29","line":"const InferTestCase = @import(\"infer_test_case.zig\").InferTestCase;"},
{"lineNum":"   30","line":"const inferExprType = @import(\"inferrer.zig\").inferExprType;"},
{"lineNum":"   31","line":"const allocate = @import(\"../../common/allocate.zig\");"},
{"lineNum":"   32","line":""},
{"lineNum":"   33","line":"pub fn inferObjectType(","class":"lineCov","hits":"1","order":"7194","possible_hits":"1",},
{"lineNum":"   34","line":"    cmp: *Compiler,"},
{"lineNum":"   35","line":"    nd: node.Node,"},
{"lineNum":"   36","line":"    ctx: *const InferContext,"},
{"lineNum":"   37","line":"    obj: node.Object,"},
{"lineNum":"   38","line":") InferResult {"},
{"lineNum":"   39","line":"    const subCtx = InferContext.none(ctx);","class":"lineCov","hits":"1","order":"7195","possible_hits":"1",},
{"lineNum":"   40","line":""},
{"lineNum":"   41","line":"    // TODO: Refactor this to avoid allocation"},
{"lineNum":"   42","line":"    var members = allocate.alloc(","class":"lineCov","hits":"1","order":"7198","possible_hits":"1",},
{"lineNum":"   43","line":"        cmp.alloc,","class":"lineCov","hits":"1","order":"7196","possible_hits":"1",},
{"lineNum":"   44","line":"        Type.InterfaceType.Member,"},
{"lineNum":"   45","line":"        obj.items.len,","class":"lineCov","hits":"1","order":"7197","possible_hits":"1",},
{"lineNum":"   46","line":"    );"},
{"lineNum":"   47","line":"    defer cmp.alloc.free(members);","class":"linePartCov","hits":"1","order":"7207","possible_hits":"2",},
{"lineNum":"   48","line":""},
{"lineNum":"   49","line":"    for (obj.items) |prop, index| {","class":"lineCov","hits":"2","order":"7199","possible_hits":"2",},
{"lineNum":"   50","line":"        const name = prop.getName();","class":"lineCov","hits":"1","order":"7200","possible_hits":"1",},
{"lineNum":"   51","line":"        switch (inferExprType(cmp, prop.value, &subCtx)) {","class":"linePartCov","hits":"2","order":"7201","possible_hits":"3",},
{"lineNum":"   52","line":"            .Success => |ty| members[index] = Type.InterfaceType.Member{","class":"linePartCov","hits":"1","order":"7202","possible_hits":"2",},
{"lineNum":"   53","line":"                .name = name,","class":"lineCov","hits":"1","order":"7203","possible_hits":"1",},
{"lineNum":"   54","line":"                .ty = ty,","class":"lineCov","hits":"1","order":"7204","possible_hits":"1",},
{"lineNum":"   55","line":"            },"},
{"lineNum":"   56","line":"            .Error => return InferResult.err(CompileError.genericError(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   57","line":"                GenericError.new(","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   58","line":"                    nd.csr,","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   59","line":"                    cmp.fmt(","class":"lineNoCov","hits":"0","possible_hits":"2",},
{"lineNum":"   60","line":"                        \"Object property \'{s}\' has an invalid type\","},
{"lineNum":"   61","line":"                        .{name},","class":"lineNoCov","hits":"0","possible_hits":"1",},
{"lineNum":"   62","line":"                    ),"},
{"lineNum":"   63","line":"                ),"},
{"lineNum":"   64","line":"            )),"},
{"lineNum":"   65","line":"        }"},
{"lineNum":"   66","line":"    }"},
{"lineNum":"   67","line":""},
{"lineNum":"   68","line":"    nd.ty = cmp.typebook.getInterface(members);","class":"lineCov","hits":"1","order":"7205","possible_hits":"1",},
{"lineNum":"   69","line":"    return InferResult.success(nd.ty.?);","class":"linePartCov","hits":"2","order":"7206","possible_hits":"3",},
{"lineNum":"   70","line":"}"},
{"lineNum":"   71","line":""},
{"lineNum":"   72","line":"test \"can infer type of an object literal\" {","class":"lineCov","hits":"3","order":"7184","possible_hits":"3",},
{"lineNum":"   73","line":"    const nodes = [_]node.Node{"},
{"lineNum":"   74","line":"        node.makeNode(std.testing.allocator, Cursor.new(1, 1), .String, \"\'a\'\"),","class":"lineCov","hits":"1","order":"7185","possible_hits":"1",},
{"lineNum":"   75","line":"        node.makeNode(std.testing.allocator, Cursor.new(2, 1), .String, \"\'1\'\"),","class":"lineCov","hits":"1","order":"7186","possible_hits":"1",},
{"lineNum":"   76","line":"        node.makeNode(std.testing.allocator, Cursor.new(3, 1), .String, \"\'b\'\"),","class":"lineCov","hits":"1","order":"7187","possible_hits":"1",},
{"lineNum":"   77","line":"        node.makeNode(std.testing.allocator, Cursor.new(4, 1), .Int, \"2\"),","class":"lineCov","hits":"1","order":"7188","possible_hits":"1",},
{"lineNum":"   78","line":"    };"},
{"lineNum":"   79","line":""},
{"lineNum":"   80","line":"    defer for (nodes) |nd|","class":"linePartCov","hits":"2","order":"7222","possible_hits":"4",},
{"lineNum":"   81","line":"        std.testing.allocator.destroy(nd);","class":"linePartCov","hits":"1","order":"7223","possible_hits":"2",},
{"lineNum":"   82","line":""},
{"lineNum":"   83","line":"    try (InferTestCase{","class":"linePartCov","hits":"1","order":"7221","possible_hits":"2",},
{"lineNum":"   84","line":"        .check = (struct {"},
{"lineNum":"   85","line":"            fn check(","class":"lineCov","hits":"1","order":"7208","possible_hits":"1",},
{"lineNum":"   86","line":"                scope: *Scope,"},
{"lineNum":"   87","line":"                typebook: *TypeBook,"},
{"lineNum":"   88","line":"                res: InferResult,"},
{"lineNum":"   89","line":"            ) anyerror!void {","class":"lineCov","hits":"1","order":"7220","possible_hits":"1",},
{"lineNum":"   90","line":"                _ = scope;"},
{"lineNum":"   91","line":"                _ = typebook;"},
{"lineNum":"   92","line":""},
{"lineNum":"   93","line":"                try InferTestCase.expectSuccess(res);","class":"lineCov","hits":"1","order":"7209","possible_hits":"1",},
{"lineNum":"   94","line":""},
{"lineNum":"   95","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"7211","possible_hits":"2",},
{"lineNum":"   96","line":"                    Type.Type.Interface,"},
{"lineNum":"   97","line":"                    res.Success.getType(),","class":"linePartCov","hits":"2","order":"7210","possible_hits":"3",},
{"lineNum":"   98","line":"                );"},
{"lineNum":"   99","line":"                const members = res.Success.Interface.members;","class":"linePartCov","hits":"2","order":"7212","possible_hits":"3",},
{"lineNum":"  100","line":"                try std.testing.expectEqual(@intCast(usize, 2), members.len);","class":"linePartCov","hits":"1","order":"7213","possible_hits":"2",},
{"lineNum":"  101","line":"                try std.testing.expectEqualStrings(\"a\", members[0].name);","class":"linePartCov","hits":"1","order":"7214","possible_hits":"2",},
{"lineNum":"  102","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"7216","possible_hits":"2",},
{"lineNum":"  103","line":"                    Type.Type.String,"},
{"lineNum":"  104","line":"                    members[0].ty.getType(),","class":"linePartCov","hits":"1","order":"7215","possible_hits":"2",},
{"lineNum":"  105","line":"                );"},
{"lineNum":"  106","line":"                try std.testing.expectEqualStrings(\"b\", members[1].name);","class":"linePartCov","hits":"1","order":"7217","possible_hits":"2",},
{"lineNum":"  107","line":"                try std.testing.expectEqual(","class":"linePartCov","hits":"1","order":"7219","possible_hits":"2",},
{"lineNum":"  108","line":"                    Type.Type.Number,"},
{"lineNum":"  109","line":"                    members[1].ty.getType(),","class":"linePartCov","hits":"1","order":"7218","possible_hits":"2",},
{"lineNum":"  110","line":"                );"},
{"lineNum":"  111","line":"            }"},
{"lineNum":"  112","line":"        }).check,"},
{"lineNum":"  113","line":"    }).run(.Object, node.Object{","class":"lineCov","hits":"1","order":"7192","possible_hits":"1",},
{"lineNum":"  114","line":"        .items = &[_]node.ObjectProperty{","class":"lineCov","hits":"1","order":"7191","possible_hits":"1",},
{"lineNum":"  115","line":"            node.ObjectProperty.new(nodes[0], nodes[1]),","class":"lineCov","hits":"1","order":"7189","possible_hits":"1",},
{"lineNum":"  116","line":"            node.ObjectProperty.new(nodes[2], nodes[3]),","class":"lineCov","hits":"1","order":"7190","possible_hits":"1",},
{"lineNum":"  117","line":"        },"},
{"lineNum":"  118","line":"    });"},
{"lineNum":"  119","line":"}"},
]};
var percent_low = 25;var percent_high = 75;
var header = { "command" : "test", "date" : "2022-02-13 15:55:52", "instrumented" : 44, "covered" : 39,};
var merged_data = [];
